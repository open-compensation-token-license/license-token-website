import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FooterComponent} from './pages/footer/footer.component';
import {MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {CtaComponent} from './pages/cta/cta.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatCardModule,
    FooterComponent,
    CtaComponent,
  ],
})

export class AppComponent {
  title = 'license-token-website';
}


