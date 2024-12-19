import { Routes } from '@angular/router';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {MoreComponent} from './pages/more/more.component';

export const routes: Routes = [

  { path: '', component: WelcomeComponent },
  { path: 'more', component: MoreComponent }, // New route for More Page

];
