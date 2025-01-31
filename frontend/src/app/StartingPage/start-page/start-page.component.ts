import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-start-page',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './start-page.component.html',
  standalone: true,
  styleUrl: './start-page.component.css'
})
export class StartPageComponent {

}
