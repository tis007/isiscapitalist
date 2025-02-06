import { Routes } from '@angular/router';
import {MainPageWorld1Component} from './World_1/main-page-world1/main-page-world1.component';
import {StartPageComponent} from './StartingPage/start-page/start-page.component';


export const routes: Routes = [
  {path: 'startPage', component: StartPageComponent},
  {path: '', redirectTo:'/startPage', pathMatch:'full'},
  {path: 'mainPageWorld1', component: MainPageWorld1Component},

];
