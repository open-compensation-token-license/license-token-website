import {inject, Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {CONSENT_TYPES, CookieConsent} from '../pages/cookie-banner/cookie-banner.component';

declare var gtag : any;

@Injectable({providedIn: 'root'})
export class AnalyticsService {

  cookieService = inject(CookieService)

  constructor() {
      let cookiesAccepted = CookieConsent.decode(this.cookieService.get(CookieConsent.name))?.acceptedCookies == CONSENT_TYPES.ALL
      if (cookiesAccepted) {
        this.loadGoogleAnalytics()
      }
  }

  loadGoogleAnalytics(): void {
    console.log('Loading Google Analytics')

    const importScriptBlock = document.createElement('script');
    importScriptBlock.async = true;
    importScriptBlock.src = 'https://www.googletagmanager.com/gtag/js?id=G-S8HDBPV75B'; // Replace with your Measurement ID
    document.head.appendChild(importScriptBlock);

    const gtagFunctionScriptBlock = document.createElement('script');

    // language=HTML
    gtagFunctionScriptBlock.text = `
      window.dataLayer = window.dataLayer || [];

      function gtag() {
      dataLayer.push(arguments);
      }
      gtag('js', new Date());

      gtag('config', 'G-S8HDBPV75B');
    `;
    document.head.appendChild(gtagFunctionScriptBlock);
  }

  trackEvent(eventName: string, eventDetails: string, eventCategory: string) {

    gtag('event', eventName, {
      // event Type - example: 'SCROLL_TO_TOP_CLICKED'
      'event_category': eventCategory,
      // the label that will show up in the dashboard as the events name
      'event_label': eventName,
      // a short description of what happened
      'value': eventDetails
    })
  }
}

//
// https://lumin8media.com/blog/add-google-analytics-angular
// Wir initializen hier und lassen das nur laufen wenn das Cookie gesetzt ist
//
