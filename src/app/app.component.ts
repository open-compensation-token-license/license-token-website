import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {NgOptimizedImage} from '@angular/common';

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
    // For Material cards
  ],
})

export class AppComponent {
  title = 'license-token-website';
}
