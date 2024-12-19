import {Component} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {RouterOutlet} from "@angular/router";
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-welcome',
  imports: [
    MatButton,
    MatDrawerContainer,
    MatDrawerContent,
    MatIcon,
    RouterOutlet,
    MatButtonModule,
    MatCardModule,
    MatDrawerContainer,
    MatDrawerContent,
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  scrollToSection() {
    const target = document.getElementById('content');
    if (target) {
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }
}
