import {Injectable, Logger} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import {Palier, Product, World} from "./graphql";
import {origworld} from "./origworld";
import {AppController} from "./app.controller";

@Injectable()
export class AppService {
    private readonly logger = new Logger(AppController.name);

    readUserWorld(user: string): World {
        try {
            const data = fs.readFileSync(
                path.join(process.cwd(), 'userworlds/', user + '-world.json'),
            );
            return JSON.parse(data.toString());
        } catch (e: unknown) {
            console.log((e as Error).message);
            return <World>origworld;
        }
    }


    saveWorld(user: string, world: World) {
        this.updateWorld(world);
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

    engagerManager(user: string, id: number) {
        let world = this.readUserWorld(user);
        this.updateWorld(world);

        let manager = world.managers.find((m) => m.idcible === id);
        if (!manager) {
            throw new Error(`Le manager du produit avec l'id ${id} n'existe pas`);
        }
        if (world.money < manager.seuil) {
            throw new Error(`Pas assez d'argent pour engager le manager du produit avec l'id ${id}`);
        }
        if (manager.unlocked) {
            throw new Error(`Le manager du produit avec l'id ${id} est déjà engagé`);
        }

        world.money -= manager.seuil;
        manager.unlocked = true;

        this.saveWorld(user, world);

        return manager;
    }

    checkUnlocks(world: World, product: Product) {
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
        if (palier.idcible >= 0) {
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
    }

    applyBonusForProduct(world: World, product: Product, palier: Palier) {
        switch (palier.typeratio) {
            case "gain":
                product.revenu *= palier.ratio;
                break;
            case "vitesse":
                product.vitesse /= palier.ratio;
                break;
        }

        this.updateWorld(world);
    }


    updateWorld(world: World): void {
        const currentTime = Date.now();
        const elapsedTime = (currentTime - world.lastupdate) / 1000; // Convert to seconds

        world.products.forEach(product => {
            if (product.managerUnlocked) {
                let productionCount = 1 + Math.floor((elapsedTime - product.timeleft) / product.vitesse);
                const remainingTime = (elapsedTime - product.timeleft) % product.vitesse;

                world.money += productionCount * product.revenu * product.quantite;
                product.timeleft = product.vitesse - remainingTime;
            } else {
                if (product.timeleft > 0) {
                    if (product.timeleft <= elapsedTime) {
                        world.money += product.revenu * product.quantite;
                        product.timeleft = 0;
                    } else {
                        product.timeleft -= elapsedTime;
                    }
                }
            }
        });
        world.lastupdate = currentTime;
    }
}