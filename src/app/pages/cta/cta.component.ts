import {Component, inject} from '@angular/core';
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
  router = inject(Router);

  onApplyLicense() {

    const email = "register@license-token.com";

    const subject = encodeURIComponent("Register my project to the License");

    // language=EMAIL
    const body = encodeURIComponent(`Hi OCTL Team,\nplease register my project to the License.

    GitHub Project Link: https://github.com/<organization or user>/<project>
    Maintainer Email: <email address>
    Ethereum/Arbitrium Address (optional):
    `);

    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_self');
  }

  onDonate() {
    window.open('https://nftpuzzle.license-token.com/', '_blank');
  }

  getTheLicenseTxt() {
    window.open('https://raw.githubusercontent.com/open-compensation-token-license/license/refs/heads/main/LICENSE.txt', '_blank');
  }
}
