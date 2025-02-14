import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {StartPageComponent} from './StartingPage/start-page/start-page.component';
import {WebserviceService} from './webservice.service';
import {World,Palier,Product} from "../../../backend/src/graphql";
import {InvestorsW1Component} from './World_1/investors-w1/investors-w1.component';
import {ManagersW1Component} from './World_1/managers-w1/managers-w1.component';
import {UnlocksW1Component} from './World_1/unlocks-w1/unlocks-w1.component';
import {UpgradesW1Component} from './World_1/upgrades-w1/upgrades-w1.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StartPageComponent, InvestorsW1Component, ManagersW1Component, UnlocksW1Component, UpgradesW1Component],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  user = 'test';
  world: World = new World();
  server : string
  constructor(private service: WebserviceService) {
    this.server = service.server;
    service.getWorld(this.user).then(
      world => {
        this.world = world.data.getWorld;
      });
  }
}
