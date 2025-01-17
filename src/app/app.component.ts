import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
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

  constructor(private router: Router) {
    // Angular / GitHub pages hack to redirect to the correct route
    let path = localStorage.getItem('path');
    if (path != undefined && path != "/") {
      localStorage.removeItem('path');
      this.router.navigate([path]);
    }
  }

  analyticsService = inject(AnalyticsService);

  ngOnInit(): void {
    this.analyticsService.trackEvent('AppComponent loaded', 'AppComponent loaded as main', 'AppComponent loaded as main')
  }

}
