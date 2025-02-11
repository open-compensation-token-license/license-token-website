import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FooterComponent} from './pages/footer/footer.component';
import {CtaComponent} from './pages/cta/cta.component';
import {CookieBannerComponent} from './pages/cookie-banner/cookie-banner.component';
import {AnalyticsService} from './services/analytics.service';

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
    CookieBannerComponent,
  ],
})

export class AppComponent implements OnInit {
  analyticsService = inject(AnalyticsService);

  ngOnInit(): void {

    // Workaround weil ich hashbased locations verwendet hatte
    const hash = window.location.hash;
    const prefix = '#/wiki';
    if (hash.startsWith(prefix)) {
      const slug = hash.slice(prefix.length);
      // Redirect to the desired URL (relative to the current domain)
      window.location.replace(`/wiki${slug}`);
    }

    this.analyticsService.trackEvent('AppComponent loaded', 'AppComponent loaded as main', 'AppComponent loaded as main')
  }
}
