import {Injectable} from '@angular/core';
import {Client, fetchExchange} from '@urql/core';
import {Palier, Product, World} from './schema';
import {ACHETER_PRODUIT, ENGAGER_MANAGER, GET_WORLD, LANCER_PRODUCTION, ACHETER_ANGEL_UPGRADE, ACHETER_CASH_UPGRADE, RESET_WORLD} from './Grapqhrequests';


@Injectable({
  providedIn: 'root'
})
export class WebserviceService {
  server = 'http://localhost:3000/';
  user = 'Toto';

  createClient() {
    return new Client({
      url: this.server + 'graphql',
      exchanges: [fetchExchange]
    });
  }

  async getWorld(user: string) {
    const response = await this.createClient().query(GET_WORLD, {"user": user}).toPromise();
    console.log('Response:', response);
    return response;
  }

  async lancerProduction(user: string, product: Product) {
    return await this.createClient().mutation(LANCER_PRODUCTION, {
      user: user,
      id: product.id,
    }).toPromise();
  }

  async engagerManager(user: string, manager: Palier) {
    return await this.createClient().mutation(ENGAGER_MANAGER, {
      user: user,
      name: manager.name
    }).toPromise();
  }

  async acheterQtProduit(user: string, product: Product, quantite: number) {
    return await this.createClient().mutation(ACHETER_PRODUIT, {
      user: user,
      id: product.id,
      quantite: quantite
    }).toPromise();
  }

  async acheterCashUpgrade(user: string, id: number) {
    return await this.createClient().mutation(ACHETER_CASH_UPGRADE, {
      user,
      id
    }).toPromise();
  }

  async acheterAngelUpgrade(user: string, id: number) {
    return await this.createClient().mutation(ACHETER_ANGEL_UPGRADE, {
      user,
      id
    }).toPromise();
  }

  async resetWorld(user: string) {
    return await this.createClient().mutation(RESET_WORLD, {
      user
    }).toPromise();
  }


  applyBonusForProduct(world: World, product: Product, palier: Palier) {
    switch (palier.typeratio) {
      case "gain":
        product.revenu *= palier.ratio;
        break;
      case "vitesse":
        product.vitesse /= palier.ratio;
        break;
      case "ange":
        world.angelbonus += palier.ratio;
        break;
    }
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

  constructor() {
  }
}
