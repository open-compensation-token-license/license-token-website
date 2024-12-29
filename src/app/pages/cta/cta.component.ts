import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {Router} from "@angular/router"

@Component({
  selector: 'app-cta',
  imports: [
    MatButton,
  ],
  standalone: true,
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.scss'
})
export class CtaComponent {
  constructor(private router: Router) {
  }

  onNavigateToLicense() {
    this.router.navigate(['/contact']);
    window.open('https://github.com/open-compensation-token-license/octl?tab=readme-ov-file#single-developer-single-digital-artifact-minting', '_blank');
  }

  onDonate() {
    window.open('https://nftpuzzle.license-token.com/', '_blank');
  }

  getTheLicenseTxt() {
    window.open('https://raw.githubusercontent.com/open-compensation-token-license/license/refs/heads/main/LICENSE.txt', '_blank');
  }
}
