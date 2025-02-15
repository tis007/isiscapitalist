import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  // user = 'test';
  // world: World = new World();
  // server : string
  // constructor(private service: WebserviceService) {
  //   this.server = service.server;
  //   service.getWorld(this.user).then(
  //     world => {
  //       this.world = world.data.getWorld;
  //     });
  // }
}
