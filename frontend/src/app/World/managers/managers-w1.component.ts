import {Component, Input} from '@angular/core';
import {Palier, World} from '../../schema';
import {WebserviceService} from '../../webservice.service';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-managers-w1',
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './managers-w1.component.html',
  standalone: true,
  styleUrl: './managers-w1.component.css'
})
export class ManagersW1Component {
  constructor(private service: WebserviceService) {
    this.server = service.server;

  }

  world: World = new World();


  server: string;

  @Input()
  set wor(value: World) {
    this.world = value;
  }


  hireManager(manager: Palier) {
    let targetManager = this.world.managers.find((m) => m.name === manager.name);

    if (targetManager && this.world.money >= targetManager.seuil) {
      this.service.engagerManager(this.world.name, targetManager).then((response) => {
        this.world.money -= targetManager.seuil;
        targetManager.unlocked = true;
        this.world.products[targetManager.idcible - 1].managerUnlocked = true;
      });
    }
  }

  refreshPage() {
      // Refresh the page after the modal closes
      window.location.reload();
  }
}
