import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product, World} from '../schema';
import {WebserviceService} from '../webservice.service';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  standalone: true,
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  _qtmulti = 'x1';
  _money = 0;
  _product = new Product;
  _world = new World;
  protected server: string;

  ngOnInit() {
    setInterval(() => { this.calcScore(); }, 100);
  }

  constructor(private service: WebserviceService) {
    this.server = service.server
  }
  product: Product =new Product();
  @Input()
  set prod(value: Product) {
    this.product = value;
  }


  @Output() onBuy = new EventEmitter<number>();

  @Output() notifyProduction = new EventEmitter<{ p: Product; qt: number }>();

  @Input()
  set produduct(value: Product) {
    this._product = value;
  }

  @Input()
  set world(value: World) {
    this._world = value;
  }

  @Input()
  set qtmulti(value: string) {
    this._qtmulti = value;
    if (this._qtmulti && this._product) this.calcMaxCanBuy();
  }

  @Input()
  set money(value: number) {
    this._money = value;
    if (this._money && this._product) this.calcMaxCanBuy();
  }



  calcScore() {
    const currentTime = Date.now();

    const elapsedTime = (currentTime - this._product.lastupdate) / 1000; // Convert to seconds

    let moneyMade = 0;
    if (this._product.managerUnlocked) {
      moneyMade = Math.floor(elapsedTime / this._product.vitesse);
      let productionCount = 1 + Math.floor((elapsedTime - this._product.timeleft) / this._product.vitesse);
      const remainingTime = (elapsedTime - this._product.timeleft) % this._product.vitesse;

      moneyMade += productionCount * this._product.revenu * this._product.quantite * (1 + this._world.activeangels *(this._world.angelbonus/100));

      this._product.timeleft = this._product.vitesse - remainingTime;
    } else {
      if (this._product.timeleft > 0) {
        if (this._product.timeleft <= elapsedTime) {
          moneyMade += this._product.revenu * this._product.quantite * (1 + this._world.activeangels *(this._world.angelbonus/100));
          this._product.timeleft = 0;
        } else {
          this._product.timeleft -= elapsedTime;
        }
      }
    }

    if (moneyMade > 0) {
      this._world.lastupdate = currentTime;
      this.notifyProduction.emit({ p: this._product, qt: moneyMade });
    }
  }

  calcMaxCanBuy(): number {
    if (!this._product || !this._money) return 0;

    const cout = this._product.cout;
    const croissance = this._product.croissance;
    const money = this._money;

    return Math.floor(Math.log((money * (croissance - 1) / cout) + 1) / Math.log(croissance));
  }

  buyProduct() {
    let quantity = 1;
    if (this._qtmulti === 'x10') quantity = 10;
    else if (this._qtmulti === 'x100') quantity = 100;
    else if (this._qtmulti === 'Max') quantity = this.calcMaxCanBuy();

    const cost = this.calculateTotalCost(quantity);
    if (cost <= this._money) {
      this.onBuy.emit(cost);
      this._product.quantite += quantity;
    }
  }

  calculateTotalCost(quantite: number): number {
    const cout = this._product.cout;
    const croissance = this._product.croissance;
    return cout * ((1 - Math.pow(croissance, quantite)) / (1 - croissance))
  }
  startFabrication(){

  }
}

