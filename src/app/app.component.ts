import {Component, HostListener} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatCardModule,
    MatDrawerContainer,
    MatDrawerContent,
    MatIcon,
  ],
})

export class AppComponent {
  title = 'license-token-website';

  scrollToSection() {
    const target = document.getElementById('content');
    if (target) {
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }


}


