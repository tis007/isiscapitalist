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

  server: string;
  @Input()
  set wor(value: World) {
    this.world = value;
  }


  hireManager() {

  }
}
