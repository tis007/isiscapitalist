import {Injectable} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import {Palier, Product, World} from "./graphql";
import {origworld} from "./origworld";

@Injectable()
export class AppService {


    readUserWorld(user: string): World {
        try {
            const data = fs.readFileSync(
                path.join(process.cwd(), 'userworlds/', user + '-world.json'),
            );
            return JSON.parse(data.toString());
        } catch (e: unknown) {
            console.log((e as Error).message);
            const world = <World>origworld;
            world.name = user;
            return world;
        }
    }


    saveWorld(user: string, world: World) {
        fs.writeFile(
            path.join(process.cwd(), 'userworlds/', user + '-world.json'),
            JSON.stringify(world),
            (err) => {
                if (err) {
                    console.error(err);
                    throw new Error(`Erreur d'écriture du monde coté serveur`);
                }
            },
        );
    }

    acheterQtProduit(user: string, id: number, quantite: number): Product {
        let world = this.readUserWorld(user);
        this.updateWorld(world);

        let product = world.products.find((p) => p.id === id);
        if (!product) {
            throw new Error(`Le produit avec l'id ${id} n'existe pas`);
        }

        //price calculation
        let prixNeeded = product.cout * ((1 - Math.pow(product.croissance, quantite)) / (1 - product.croissance));

        if (prixNeeded > world.money) {
            throw new Error(`Pas assez d'argent pour acheter ${quantite} ${product.name}`);
        }

        world.money -= prixNeeded;
        product.quantite += quantite;
        product.cout = product.cout * Math.pow(product.croissance, quantite);

        this.checkUnlocks(world, product);

        this.saveWorld(user, world);

        return product;
    }


    lancerProductionProduit(user: string, id: number): Product {
        let world = this.readUserWorld(user);
        this.updateWorld(world);

        let product = world.products.find((p) => p.id === id);
        if (!product) {
            throw new Error(`Le produit avec l'id ${id} n'existe pas`);
        }

        product.timeleft = product.vitesse;

        this.saveWorld(user, world);

        return product;
    }

    engagerManager(user: string, name: string) {
        let world = this.readUserWorld(user);
        this.updateWorld(world);

        let manager = world.managers.find((m) => m.name === name);
        if (!manager) {
            throw new Error(`Le manager du produit avec l'id ${name} n'existe pas`);
        }
        if (world.money < manager.seuil) {
            throw new Error(`Pas assez d'argent pour engager le manager du produit avec l'id ${name}`);
        }
        if (manager.unlocked) {
            throw new Error(`Le manager du produit avec l'id ${name} est déjà engagé`);
        }

        world.money -= manager.seuil;
        manager.unlocked = true;
        world.products.find((p) => p.id === manager.idcible).managerUnlocked = true;

        this.saveWorld(user, world);

        return manager;
    }

    checkUnlocks(world: World, product: Product) {
        this.updateWorld(world);
        // specific unlocks
        this.checkProductUnlocks(world, product);

        // allunlocks
        this.checkAllUnlocks(world);
    }

    checkProductUnlocks(world: World, product: Product) {
        product.paliers.forEach(palier => {
            if (!palier.unlocked && product.quantite >= palier.seuil) {
                palier.unlocked = true;
                this.applyBonus(world, palier);
            }
        });
    }

    checkAllUnlocks(world: World) {
        let productQuantityTotal = 0;
        world.products.forEach(product => {
            productQuantityTotal += product.quantite;
        })

        world.allunlocks.forEach(palier => {
            if (!palier.unlocked && productQuantityTotal >= palier.seuil) {
                palier.unlocked = true;
                this.applyBonus(world, palier);
            }
        });

    }

    applyBonus(world: World, palier: Palier) {
        if (palier.idcible > 0) {
            let product = world.products.find((p) => p.id === palier.idcible);
            if (!product) {
                throw new Error(`Le produit avec l'id ${palier.idcible} n'existe pas`);
            }
            this.applyBonusForProduct(world, product, palier);
        }

        if (palier.idcible === 0) {
            world.products.forEach(product => {
                this.applyBonusForProduct(world, product, palier);
            });
        }

        if (palier.idcible === -1) {
            world.angelbonus += palier.ratio;
        }
    }

    applyBonusForProduct(world: World, product: Product, palier: Palier) {
        switch (palier.typeratio) {
            case "gain":
                console.log("gain");
                product.revenu *= palier.ratio;
                break;
            case "vitesse":
                console.log("vitesse");
                product.vitesse /= palier.ratio;
                break;
            case "ange":
                console.log("ange");
                world.angelbonus += palier.ratio;
                break;
        }

        this.updateWorld(world);
        this.saveWorld(world.name, world);
    }


    acheterCashUpgrade(user: string, name: string): Palier {
        let world = this.readUserWorld(user);
        this.updateWorld(world);

        let upgrade = world.upgrades.find((u) => u.name === name);
        if (!upgrade) {
            throw new Error(`L'upgrade avec l'id ${name} n'existe pas`);
        }
        if (world.money < upgrade.seuil) {
            throw new Error(`Pas assez d'argent pour acheter l'upgrade ${upgrade.name}`);
        }
        if (upgrade.unlocked) {
            throw new Error(`L'upgrade ${upgrade.name} est déjà débloqué`);
        }

        world.money -= upgrade.seuil;
        upgrade.unlocked = true;
        this.applyBonus(world, upgrade);

        this.saveWorld(user, world);

        return upgrade;
    }


    acheterAngelUpgrade(user: string, name: string): Palier {
        let world = this.readUserWorld(user);
        this.updateWorld(world);

        let upgrade = world.angelupgrades.find((u) => u.name === name);
        if (!upgrade) {
            throw new Error(`L'upgrade avec l'id ${name} n'existe pas`);
        }
        if (world.activeangels < upgrade.seuil) {
            throw new Error(`Pas assez d'anges pour acheter l'upgrade ${upgrade.name}`);
        }
        if (upgrade.unlocked) {
            throw new Error(`L'upgrade ${upgrade.name} est déjà débloqué`);
        }

        world.activeangels -= upgrade.seuil;
        upgrade.unlocked = true;
        this.applyBonus(world, upgrade);

        this.saveWorld(user, world);

        return upgrade;
    }

    worldReset(user: string): World {
        let world = this.readUserWorld(user);
        this.updateWorld(world);

        // Calculate additional angels gained
        const additionalAngels = Math.floor(150 * Math.sqrt(world.score / Math.pow(10, 4))) - world.totalangels;
        world.totalangels += additionalAngels;
        world.activeangels += additionalAngels;

        // Store properties
        const score = world.score;
        const totalangels = world.totalangels;
        const activeangels = world.activeangels;
        const name = world.name;

        // Reset world to its initial state
        world = <World>origworld;
        world.name = name;
        world.score = score;
        world.totalangels = totalangels;
        world.activeangels = activeangels;

        this.saveWorld(user, world);

        return world;
    }

    updateWorld(world: World): void {
        const currentTime = Date.now();
        const elapsedTime = (currentTime - world.lastupdate); // Convert to seconds

        let moneyMade = 0;
        world.products.forEach(product => {
            if (product.managerUnlocked) {
                let productionCount = Math.floor((elapsedTime + product.vitesse - product.timeleft) / product.vitesse);
                const remainingTime = (elapsedTime + product.vitesse - product.timeleft) % product.vitesse;

                moneyMade += productionCount * product.revenu * product.quantite * (1 + world.activeangels * (world.angelbonus / 100));

                product.timeleft = product.vitesse - remainingTime;
            } else {
                if (product.timeleft > 0) {
                    if (product.timeleft <= elapsedTime) {
                        moneyMade += product.revenu * product.quantite * (1 + world.activeangels * (world.angelbonus / 100));

                        product.timeleft = 0;
                    } else {
                        product.timeleft -= elapsedTime;
                    }
                }
            }
        });

        world.money += moneyMade;
        world.score += moneyMade;
        world.lastupdate = currentTime;
    }
}