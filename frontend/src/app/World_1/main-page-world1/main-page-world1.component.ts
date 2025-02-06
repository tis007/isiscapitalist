import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {UnlocksW1Component} from '../unlocks-w1/unlocks-w1.component';
import {UpgradesW1Component} from '../upgrades-w1/upgrades-w1.component';
import {ManagersW1Component} from '../managers-w1/managers-w1.component';
import {InvestorsW1Component} from '../investors-w1/investors-w1.component';

@Component({
  selector: 'app-main-page-world1',
  imports: [
    RouterLinkActive,
    RouterLink,
    UnlocksW1Component,
    UpgradesW1Component,
    ManagersW1Component,
    InvestorsW1Component
  ],
  templateUrl: './main-page-world1.component.html',
  standalone: true,
  styleUrl: './main-page-world1.component.css'
})
export class MainPageWorld1Component {

}
