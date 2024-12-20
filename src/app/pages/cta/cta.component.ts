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
    this.router.navigate(['/apply-license']);
  }

  onDonate() {
    window.open('https://nftpuzzle.license-token.com/', '_blank');
  }
}
