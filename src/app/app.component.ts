import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {NgOptimizedImage} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    MatButtonModule, // For Material buttons
    MatCardModule,
    MatDrawerContainer,
    MatDrawerContent,
    NgOptimizedImage,
    MatIcon,
    RouterLink,
    // For Material cards
  ],
})

export class AppComponent {
  title = 'license-token-website';

  scrollToSection() {
    const target = document.getElementById('why-choose-us');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


}


