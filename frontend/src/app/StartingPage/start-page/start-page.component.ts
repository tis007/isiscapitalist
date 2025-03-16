import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-start-page',
  imports: [
    NgOptimizedImage,
    FormsModule
  ],
  templateUrl: './start-page.component.html',
  standalone: true,
  styleUrl: './start-page.component.css'
})
export class StartPageComponent {
 constructor(private router : Router) {
 }
  userName: string = '';
  startGame() {
   //on ajoute une condition selon l'utilisateur pour la redirection vers le bon monde
    this.router.navigate(['/mainPageWorld1'])
  }
}
