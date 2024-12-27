import {Routes} from '@angular/router';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {PrivacyPolicyComponent} from './pages/privacy-policy/privacy-policy.component';
import { ContactComponent } from './pages/contact/contact.component';


export const routes: Routes = [
  {path: '', component: WelcomeComponent},
  { path: 'contact', component: ContactComponent },
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  // {path: 'more', component: MoreComponent},
];
