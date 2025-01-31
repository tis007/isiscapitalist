import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {AppService} from './app.service';
import {Product, World} from "./graphql";

@Resolver('World')
export class GraphQlResolver {

    constructor(private service: AppService) {
    }

    @Query()
    async getWorld(@Args('user') user: string) {
        let world = this.service.readUserWorld(user);
        this.service.saveWorld(user, world);
        return world;
    }


    @Mutation()
    async acheterQtProduit(
        @Args('user') user: string,
        @Args('id') id: number,
        @Args('quantite') quantite: number,
    ): Promise<Product> {

        let world = this.service.readUserWorld(user);

        let product = world.products.find((p) => p.id === id);
        if (!product) {
            throw new Error(`Le produit avec l'id ${id} n'existe pas`)
        }
        let prixNeeded = product.cout * ((1 - Math.pow(product.croissance, quantite)) / (1 - product.croissance));

        if (prixNeeded > world.money) {
            throw new Error(`Pas assez d'argent pour acheter ${quantite} ${product.name}`);
        }

        world.money -= prixNeeded;
        product.quantite += quantite;
        product.cout = product.cout * Math.pow(product.croissance, quantite);

        this.service.saveWorld(user, world);

        return product;
    }


    @Mutation()
    async lancerProductionProduit(
        @Args('user') user: string,
        @Args('id') id: number,
    ): Promise<Product> {
        let world = this.service.readUserWorld(user);

        let product = world.products.find((p) => p.id === id);
        if (!product) {
            throw new Error(`Le produit avec l'id ${id} n'existe pas`);
        }

        product.timeleft = product.vitesse;

        this.service.saveWorld(user, world);

        return product;
    }

    @Mutation()
    async engagerManager(
        @Args('user') user: string,
        @Args('id') id: number,
    ){
        let world = this.service.readUserWorld(user);

        let manager = world.managers.find((m) => m.idcible === id);
        if (!manager) {
            throw new Error(`Le manager du produit avec l'id ${id} n'existe pas`);
        }
        if(world.money < manager.seuil){
            throw new Error(`Pas assez d'argent pour engager le manager du produit avec l'id ${id}`);
        }
        if (manager.unlocked){
            throw new Error(`Le manager du produit avec l'id ${id} est déjà engagé`);
        }

        world.money -= manager.seuil;
        manager.unlocked = true;
        return manager;
    }
}