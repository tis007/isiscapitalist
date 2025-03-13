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

  world: World = new World();

  server: string;

  @Input()
  set wor(value: World) {
    this.world = value;
  }

  calcAngelToClaim() {
    return Math.floor(150 * Math.sqrt(this.world.score / Math.pow(10, 4))) - this.world.totalangels;
  }

  resetWorld() {
    this.service.resetWorld(this.service.user).then((response) => {
      this.world = response.data.worldReset;
    });
  }
}
