import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Palier, Product, World} from '../schema';
import {WebserviceService} from '../webservice.service';
import {DatePipe, NgClass, NgIf} from '@angular/common';
import {NumberSuffixPipe} from '../../Pipes/number-suffix.pipe';
import {MyProgressBarComponent, Orientation} from './progressbar.component';

@Component({
  selector: 'app-product',
  imports: [
    NgIf,
    NumberSuffixPipe,
    NgClass,
    MyProgressBarComponent,
    DatePipe
  ],
  templateUrl: './product.component.html',
  standalone: true,
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  _product = new Product();
  _world = new World();
  _multiplier = 1;
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
  set multiplier(value: number) {
    this._multiplier = value;
    if (this._multiplier && this._product) this.calcMaxCanBuy();
  }

  calcScore() {

    const currentTime = Date.now();

    const elapsedTime = (currentTime - this._product.lastupdate);

    let moneyMade = 0;
    if (this._product.timeleft > 0) {
      if (this._product.managerUnlocked) {
        this.run= true;
        //moneyMade = Math.floor(elapsedTime / this._product.vitesse);
        let productionCount = Math.floor((elapsedTime + this._product.vitesse - this._product.timeleft) / this._product.vitesse);
        const remainingTime = (elapsedTime + this._product.vitesse - this._product.timeleft) % this._product.vitesse;
        moneyMade += productionCount * this._product.revenu * this._product.quantite * (1 + this._world.activeangels * (this._world.angelbonus / 100));

        this._product.timeleft = this._product.vitesse - remainingTime;
        if (this._product.timeleft === 0) {
          this._product.timeleft = this._product.vitesse;

        }
      } else {

        if (this._product.timeleft <= elapsedTime) {
          moneyMade += this._product.revenu * this._product.quantite * (1 + this._world.activeangels * (this._world.angelbonus / 100));
          this._product.timeleft = 0;
        } else {
          this._product.timeleft -= elapsedTime;

        }
      }
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
    let quantity = this._multiplier;

    if (this._multiplier === -1) quantity = this.calcMaxCanBuy();

    const cost = this.calculateTotalCost(quantity);

    if (cost <= this._world.money) {
      this.service.acheterQtProduit(this._world.name, this._product, quantity).then(r => {

        console.log(r)
        if (r.error === undefined) {
          this.onBuy.emit(cost);
          this.updateCost(quantity);
          this._product.quantite += quantity;
          this.checkUnlocks(this._world, this._product);
        }
      });
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
    if (this._product.timeleft == 0) {
      this.service.lancerProduction(this._world.name, this._product).then(r => {
        this._product.timeleft = this._product.vitesse;
        this.run = true;
        setTimeout(() => {
          this.run = false;
        }, 10);
      });
    }
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
        this.service.applyBonus(world, palier);
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
        this.service.applyBonus(world, palier);
      }
    });

  }
  progressbarvalue=0;
  setProgress(value: number) {
    if (value >= 0 && value <= 100) {
      this.progressbarvalue = value;
    } else if (value < 0) {
      this.progressbarvalue = 0;
    } else {
      this.progressbarvalue = 100;
    }
  }
  //progress bar:
  initialValue = 0
  run = false
  vitesse: number = 0
  orientation = Orientation.horizontal
}

