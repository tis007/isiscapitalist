import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product, World} from '../schema';
import {WebserviceService} from '../webservice.service';
import {NgClass, NgIf} from '@angular/common';
import {TimeFormatPipe} from '../../Pipes/time-format.pipe';
import {NumberSuffixPipe} from '../../Pipes/number-suffix.pipe';

@Component({
  selector: 'app-product',
  imports: [
    NgIf,
    TimeFormatPipe,
    NumberSuffixPipe,
    NgClass
  ],
  templateUrl: './product.component.html',
  standalone: true,
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  _qtmulti = 'x1';
  _product = new Product;
  _world = new World;
  protected server: string;

  ngOnInit() {
    setInterval(() => {
      this.calcScore();
    }, 100);
  }

  constructor(private service: WebserviceService) {
    this.server = service.server
  }


  @Output() onBuy = new EventEmitter<number>();

  @Output() notifyProduction = new EventEmitter<{ p: Product; qt: number }>();

  @Input()
  set product(value: Product) {
    this._product = value;
    this._product.lastupdate = Date.now();
    if (this._world.money && this._product) this.calcMaxCanBuy();
  }

  @Input()
  set world(value: World) {
    this._world = value;
    if (this._world.money && this._product) this.calcMaxCanBuy();
  }

  @Input()
  set qtmulti(value: string) {
    this._qtmulti = value;
    if (this._qtmulti && this._product) this.calcMaxCanBuy();
  }

  calcScore() {

    const currentTime = Date.now();

    const elapsedTime = (currentTime - this._product.lastupdate);

    let moneyMade = 0;
    if (this._product.managerUnlocked) {
      //moneyMade = Math.floor(elapsedTime / this._product.vitesse);
      let productionCount = 1 + Math.floor((elapsedTime - this._product.timeleft) / this._product.vitesse);
      const remainingTime = (elapsedTime - this._product.timeleft) % this._product.vitesse;

      moneyMade += productionCount * this._product.revenu * this._product.quantite * (1 + this._world.activeangels * (this._world.angelbonus / 100));

      console.log(this._product.vitesse)
      this._product.timeleft = this._product.vitesse - remainingTime;
    } else {
      if (this._product.timeleft > 0) {
        if (this._product.timeleft <= elapsedTime) {
          console.log(this._product.revenu + ":" + this._product.quantite + ":" + this._world.activeangels + ":" + this._world.angelbonus);
          moneyMade += this._product.revenu * this._product.quantite * (1 + this._world.activeangels * (this._world.angelbonus / 100));
          console.log('moneyMade', moneyMade);
          this._product.timeleft = 0;
        } else {
          this._product.timeleft -= elapsedTime;
        }
      }

      // on prévient le composant parent que ce produit a généré son revenu.
      this.notifyProduction.emit({p: this._product, qt: moneyMade});
    }


    this._product.lastupdate = currentTime;
    if (moneyMade > 0) {
      this.notifyProduction.emit({p: this._product, qt: moneyMade});
    }
  }

  calcMaxCanBuy(): number {
    if (!this._product || !this._world.money) return 0;

    const cout = this._product.cout;
    const croissance = this._product.croissance;
    const money = this._world.money;

    return Math.floor(Math.log((money * (croissance - 1) / cout) + 1) / Math.log(croissance));
  }

  buyProduct() {
    let quantity = 1;
    if (this._qtmulti === 'x10') quantity = 10;
    else if (this._qtmulti === 'x100') quantity = 100;
    else if (this._qtmulti === 'Max') quantity = this.calcMaxCanBuy();

    const cost = this.calculateTotalCost(quantity);
    console.log('cost', cost);
    console.log('money', this._world.money);
    if (cost <= this._world.money) {
      this.onBuy.emit(cost);
      this.updateCost(quantity);
      this._product.quantite += quantity;
    }

  }

  calculateTotalCost(quantite: number): number {
    const cout = this._product.cout;
    const croissance = this._product.croissance;
    return cout * ((1 - Math.pow(croissance, quantite)) / (1 - croissance))
  }

  updateCost(quantite: number) {
    this._product.cout *= Math.pow(this._product.croissance, quantite);
  }

  startFabrication() {
    if (!this._product.managerUnlocked && this._product.timeleft == 0) {
      this._product.timeleft = this._product.vitesse;
    }
  }
}

