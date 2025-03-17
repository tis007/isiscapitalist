import {Component, Input} from '@angular/core';
import {WebserviceService} from '../../webservice.service';
import {Palier, World} from '../../schema';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {NumberSuffixPipe} from "../../../Pipes/number-suffix.pipe";

@Component({
  selector: 'app-upgrades-w1',
    imports: [
        NgForOf,
        NgIf,
        NgClass,
        NumberSuffixPipe
    ],
  templateUrl: './upgrades-w1.component.html',
  standalone: true,
  styleUrl: './upgrades-w1.component.css'
})
export class UpgradesW1Component {
  constructor(private service: WebserviceService) {
    this.server = service.server
  }

  world: World = new World();

  server: string;
  selectedCategory: string = 'cash';

  @Input()
  set wor(value: World) {
    this.world = value;
  }

  buyUpgrade(upgrade: Palier) {
    if (upgrade.seuil <= this.world.money) {
      this.service.acheterCashUpgrade(this.world.name, upgrade).then((response) => {

        if (response.error === undefined) {
          this.service.applyBonus(this.world, upgrade);
          this.world.money -= upgrade.seuil;
          upgrade.unlocked = true;
        }
      })
    }
  }

  buyAngelUpgrade(upgrade: Palier) {
    if (upgrade.seuil <= this.world.activeangels) {
      this.service.acheterAngelUpgrade(this.world.name, upgrade).then((response) => {
        if (response.error === undefined) {
          this.service.applyBonus(this.world, upgrade);
          this.world.activeangels -= upgrade.seuil;
          upgrade.unlocked = true;
        }
      })
    }
  }


}
