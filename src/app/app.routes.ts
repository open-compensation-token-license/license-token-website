import {Routes} from '@angular/router';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {PrivacyPolicyComponent} from './pages/privacy-policy/privacy-policy.component';

export const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  // {path: 'more', component: MoreComponent},
];
