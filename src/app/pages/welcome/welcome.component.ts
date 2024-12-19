import {Component} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatCardModule} from '@angular/material/card';
import {Router} from "@angular/router"

@Component({
  selector: 'app-welcome',
  imports: [
    MatButton,
    MatDrawerContainer,
    MatDrawerContent,
    MatIcon,
    MatButtonModule,
    MatCardModule,
    MatDrawerContainer,
    MatDrawerContent,
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  constructor(private router: Router) {
  }

  scrollToSection() {
    const target = document.getElementById('content');
    if (target) {
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }

  navigateToApplyLicense() {
    this.router.navigate(['/apply-license']); // Navigate to Apply License route
  }

  navigateToDonate() {
    this.router.navigate(['/more']); // Navigate to Donate on OpenSea route
  }

}
