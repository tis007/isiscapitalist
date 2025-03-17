import { Component } from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {WebserviceService} from '../../webservice.service';

@Component({
  selector: 'app-start-page',
  imports: [
    NgOptimizedImage,
    FormsModule,
    NgIf
  ],
  templateUrl: './start-page.component.html',
  standalone: true,
  styleUrl: './start-page.component.css'
})
export class StartPageComponent {
 constructor(private router : Router, private service: WebserviceService) {
 }
  userName: string = '';
  showMessage: boolean = false;
  inputTouched: boolean = false;

  validateInput() {
    this.inputTouched = true;
    this.showMessage = !this.userName.trim();
  }
  startGame() {
    this.validateInput();
    if (this.showMessage) return;
    this.service.user = this.userName;
    this.router.navigate(['/mainPageWorld1']);
  }
}
