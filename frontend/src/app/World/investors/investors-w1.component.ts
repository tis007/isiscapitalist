import {Component, Input} from '@angular/core';
import {WebserviceService} from '../../webservice.service';
import {World} from '../../schema';
import Swal from 'sweetalert2';


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
    const angelsToClaim = this.calcAngelToClaim()
    if (angelsToClaim > 0) {
      Swal.fire({
        title: "Are you sure?",
        text: `You have ${angelsToClaim} angels to claim!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4E7372",
        cancelButtonColor: "#9faead",
        confirmButtonText: "Yes, claim angels!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.resetWorld(this.service.user).then((response) => {
            this.world = response.data.resetWorld;
            Swal.fire({
              title: "Reset Successful!",
              text: `You have claimed ${angelsToClaim} angels!`,
              icon: "success",
              confirmButtonColor: "#4E7372"
            }).then(() => {
              window.location.reload();
            });
          });
        }
      });
    } else {
      Swal.fire({
        title: "No Angels to Claim!",
        text: "You don't have any angels available for claiming yet.",
        icon: "info",
        confirmButtonColor: "#4E7372"
      });
    }
  }
}
