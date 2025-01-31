import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {StartPageComponent} from './StartingPage/start-page/start-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StartPageComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
