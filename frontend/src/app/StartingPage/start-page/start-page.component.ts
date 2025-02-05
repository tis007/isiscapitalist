import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Router} from '@angular/router';

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
 constructor(private router : Router) {
 }
  startGame() {
   //on ajoute une condition selon l'utilisateur pour la redirection vers le bon monde
    this.router.navigate(['/mainPageWorld1'])
  }
}
