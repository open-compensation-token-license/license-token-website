import {Component, inject, Injectable} from '@angular/core';
import {NgIf} from '@angular/common';
import {CookieOptions, CookieService} from 'ngx-cookie-service';
import {AnalyticsService} from '../../services/analytics.service';
import {RouterLink} from '@angular/router';


export enum CONSENT_TYPES {
  ALL = 'all',
  TECHNICAL = 'technical'
}

export class CookieConsent {
  static readonly name: string = 'cookie-consent';

  constructor(decisionMade: boolean, type: CONSENT_TYPES) {
    this.acceptedCookies = type;
    this.decisionMade = decisionMade;
  }

  decisionMade: boolean = false;
  acceptedCookies: CONSENT_TYPES;

  static options: CookieOptions = {
    expires: 365,
    path: '/'
  }

  public static decode(cookie: string): CookieConsent | null {
    try {
      return new CookieConsent(
        JSON.parse(atob(cookie)).decisionMade,
        JSON.parse(atob(cookie)).acceptedCookies
      )
    } catch (e) {
      return null
    }
  }

  public static encode(cookie: CookieConsent): string {
    return btoa(JSON.stringify(cookie))
  }
}

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  imports: [
    NgIf,
    RouterLink
  ],
  styleUrls: ['./cookie-banner.component.scss'],
  providers: [CookieService]
})

@Injectable({providedIn: 'root'})
export class CookieBannerComponent {

  CONSENT_TYPES = CONSENT_TYPES;

  cookieService = inject(CookieService)
  analyticsService = inject(AnalyticsService)

  constructor() {


    const json = CookieConsent.decode(this.cookieService.get(CookieConsent.name))
    if (json && json.acceptedCookies === CONSENT_TYPES.ALL) {
      this.analyticsService.loadGoogleAnalytics()
    }
  }

  showBanner(): boolean {
    return !CookieConsent.decode(this.cookieService.get(CookieConsent.name))?.decisionMade
  }

  saveCookieWithType(type: CONSENT_TYPES) {
    this.cookieService.set(CookieConsent.name, CookieConsent.encode(new CookieConsent(true, type)), CookieConsent.options);
  }

  giveConsent(consentType: string): void {

    if (consentType === CONSENT_TYPES.ALL) {
      this.saveCookieWithType(consentType)
      this.analyticsService.loadGoogleAnalytics()
    } else if (consentType === CONSENT_TYPES.TECHNICAL) {
      this.saveCookieWithType(consentType)
    }
  }
}
