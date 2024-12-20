import {Routes} from '@angular/router';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {MoreComponent} from './pages/more/more.component';
import {ApplyLicenseComponent} from './pages/apply-license/apply-license.component';

export const routes: Routes = [
  {path: '', component: WelcomeComponent},
  // {path: 'more', component: MoreComponent},
  // {path: 'apply-license', component: ApplyLicenseComponent}
];
