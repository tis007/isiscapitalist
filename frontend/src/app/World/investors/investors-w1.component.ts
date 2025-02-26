import {Component, Input} from '@angular/core';
import {WebserviceService} from '../../webservice.service';
import {World} from '../../schema';

@Component({
  selector: 'app-investors-w1',
  imports: [],
  templateUrl: './investors-w1.component.html',
  standalone: true,
  styleUrl: './investors-w1.component.css'
})
export class InvestorsW1Component {
  constructor(private service: WebserviceService) {
    this.server = service.server
  }
  world: World =new World();

  server: string;
  @Input()
  set wor(value: World) {
    this.world = value;
  }
}
