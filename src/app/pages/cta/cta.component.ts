import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';

@Component({
  selector: 'app-cta',
  imports: [
    MatButton,
    MatDrawerContainer,
    MatDrawerContent
  ],
  standalone: true,
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.scss'
})
export class CtaComponent {
  // Navigate to the Apply License page
  onNavigateToLicense() {
    // Logic to navigate to the license page (Update the route as needed)
    window.location.href = '/apply-license';
  }

  // Open a URL to handle donations
  onDonate() {
    // Redirect to the donation page (Update the link as needed)
    window.open('https://nftpuzzle.license-token.com/', '_blank');
  }
}
