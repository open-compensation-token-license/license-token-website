import {Component, inject, OnInit} from '@angular/core';
import {MarkdownModule} from 'ngx-markdown';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {JsonLdService} from '../../../services/json-ld.service';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-innovative-funding',
  imports: [
    CommonModule,
    MarkdownModule,
    MatButton,
  ],
  templateUrl: './innovative-funding.component.html',
  styleUrl: './innovative-funding.component.scss'
})
export class InnovativeFundingComponent implements OnInit {
  public markdownContent: string = '';

  jsonLdService = inject(JsonLdService);
  httpClient = inject(HttpClient);
  router = inject(Router);

  ngOnInit(): void {
    this.loadMarkdownContent();
    this.addStructuredData();
  }


  navigateToHome() {
    this.router.navigate(['/']);
  }

  private loadMarkdownContent(): void {
    this.httpClient
      .get('public/markdown/Innovative_Funding_for_Open_Source_Projects.md', {responseType: 'text'})
      .subscribe((data) => {
        this.markdownContent = data;
      });
  }

  private addStructuredData(): void {
    const jsonLdData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How to fund an open source project?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Explore grants, sponsorships, crowdfunding, or innovative models like the Open Compensation Token License, which offers tokenized royalties for usage."
          }
        },
        {
          "@type": "Question",
          "name": "What are common open source funding models?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Common models include donations, corporate sponsorships, dual-licensing, and crowdfunding. OCTL introduces token-based royalties."
          }
        },
        {
          "@type": "Question",
          "name": "How can open source developers get grants?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Apply through organizations like the Mozilla Foundation or the Linux Foundation, or use platforms like OCTL for transparent, automatic grant distribution."
          }
        },
        {
          "@type": "Question",
          "name": "What is crowdfunding for open source?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Crowdfunding involves raising small amounts from many individuals, often via platforms like Kickstarter, tailored to open source projects."
          }
        },
        {
          "@type": "Question",
          "name": "How does sponsorship work for open source projects?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Companies or individuals sponsor projects, providing funds in exchange for influence, visibility, or specialized features. GitHub Sponsors is a notable platform for this."
          }
        },
        {
          "@type": "Question",
          "name": "How can I monetize open source software?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Monetization can come from offering paid features, consulting, or through models like OCTL where usage directly compensates creators."
          }
        }
      ]
    };

    this.jsonLdService.insertJsonLd(jsonLdData);

  }

}
