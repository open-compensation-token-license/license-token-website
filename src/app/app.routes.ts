import {Routes} from '@angular/router';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {PrivacyPolicyComponent} from './pages/privacy-policy/privacy-policy.component';
import {ContactComponent} from './pages/contact/contact.component';
import {InnovativeFundingComponent} from './pages/wiki/innovative-funding/innovative-funding.component';


export const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  {path: 'wiki/innovative_funding', component: InnovativeFundingComponent},
];
