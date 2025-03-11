import {Component, Input} from '@angular/core';
import {Palier, Product, World} from '../../schema';
import {WebserviceService} from '../../webservice.service';
import {NgForOf, NgIf} from '@angular/common';


@Component({
  selector: 'app-managers-w1',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './managers-w1.component.html',
  standalone: true,
  styleUrl: './managers-w1.component.css'
})
export class ManagersW1Component {
  constructor(private service: WebserviceService) {
    this.server = service.server
  }
  world: World =new World();

  _manager: Palier = new Palier;

  server: string;
  @Input()
  set wor(value: World) {
    this.world = value;
  }

  @Input()
  set manager(value: Palier) {
    this._manager = value;
  }


  hireManager() {
    console.log('Hiring manager');

    if (this.world.money >= this._manager.seuil) {
      this.world.money -= this._manager.seuil;
      this._manager.unlocked = true;
      this.world.products[this._manager.idcible].managerUnlocked = true;
    }

  }
}
