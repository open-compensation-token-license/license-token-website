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

    const email = "recipient@example.com"; // Replace with the desired recipient email address

    const subject = encodeURIComponent("Register my project to the License");

    const furtherInstructions = 'https://github.com/open-compensation-token-license/octl?tab=readme-ov-file#single-developer-single-digital-artifact-minting'

    const body = `
    Hi OCTL Team,

    please register my project to the License.

    Ethereum/Arbitrium Address: 0x
    GitHub Project Link: https://github.com/<The Organization or user>/<The project>
    Maintainer Email: <The Email address>

    I did read the further Instructions on https://github.com/open-compensation-token-license/octl?tab=readme-ov-file#single-developer-single-digital-artifact-minting
    `;

    const mailtoLink = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_self');

  }

  onDonate() {
    window.open('https://nftpuzzle.license-token.com/', '_blank');
  }

  getTheLicenseTxt() {
    window.open('https://raw.githubusercontent.com/open-compensation-token-license/license/refs/heads/main/LICENSE.txt', '_blank');
  }
}
