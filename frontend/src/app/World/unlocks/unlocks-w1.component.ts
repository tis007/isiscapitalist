import {Component, Input} from '@angular/core';
import {World} from '../../schema';
import {NgForOf} from '@angular/common';
import {WebserviceService} from '../../webservice.service';

@Component({
  selector: 'app-unlocks-w1',
  imports: [
    NgForOf
  ],
  templateUrl: './unlocks-w1.component.html',
  standalone: true,
  styleUrl: './unlocks-w1.component.css'
})
export class UnlocksW1Component {
  server : string
  world: World =new World();
  constructor(private service: WebserviceService) {
    this.server = service.server
  }
  @Input()
  set wor(value: World) {
    this.world = value;
  }
}
