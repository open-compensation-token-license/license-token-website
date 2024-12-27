import {Component, OnInit, inject} from '@angular/core';
import {EventType, NavigationEnd, NavigationStart, Router, RouterOutlet} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FooterComponent} from './pages/footer/footer.component';
import {CtaComponent} from './pages/cta/cta.component';
import {CONSENT_TYPES, CookieBannerComponent, CookieConsent} from './pages/cookie-banner/cookie-banner.component';
import {CookieService} from 'ngx-cookie-service';
import {AnalyticsService} from './services/analytics.service';

// declare let gtag: Function;

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

export class AppComponent  implements OnInit {

  analyticsService = inject(AnalyticsService)
  ngOnInit(): void {
    this.analyticsService.trackEvent('AppComponent loaded', 'AppComponent loaded as main', 'AppComponent loaded as main' )
  }
}


