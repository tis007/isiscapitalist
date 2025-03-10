import { Component } from '@angular/core';
import {UnlocksW1Component} from '../unlocks/unlocks-w1.component';
import {UpgradesW1Component} from '../upgrades/upgrades-w1.component';
import {ManagersW1Component} from '../managers/managers-w1.component';
import {InvestorsW1Component} from '../investors/investors-w1.component';
import {Product, World} from '../../schema';
import {WebserviceService} from '../../webservice.service';
import {ProductComponent} from '../../product/product.component';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-main-page-world1',
  imports: [
    UnlocksW1Component,
    UpgradesW1Component,
    ManagersW1Component,
    InvestorsW1Component,
    ProductComponent,
    DecimalPipe
  ],
  templateUrl: './main-page-world1.component.html',
  standalone: true,
  styleUrl: './main-page-world1.component.css'
})
export class MainPageWorld1Component {

  server: string;
  world: World = new World();
  product: Product = new Product();
  constructor(private service: WebserviceService) {
    this.server= service.server
    service.getWorld(this.service.user).then(
      world => {
        this.world = world.data.getWorld;
      });
  }


  onProductionDone($event: { p: Product; qt: number }) {
    let moneyMade = $event.qt
    this.world.money += moneyMade;
    this.world.score += moneyMade;
  }

  onBuy($event: number) {
    this.world.money -= $event;
  }
}
