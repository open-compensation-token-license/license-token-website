import {Component} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatCardModule} from '@angular/material/card';
import {Router} from "@angular/router"
import {CtaComponent} from '../cta/cta.component';

@Component({
  selector: 'app-welcome',
  imports: [
    MatButton,
    MatDrawerContainer,
    MatDrawerContent,
    MatIcon,
    MatButtonModule,
    MatCardModule,
    MatDrawerContainer,
    MatDrawerContent,
    CtaComponent,
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  constructor(private router: Router) {
  }

  scrollToSection() {
    const target = document.getElementById('content');
    if (target) {
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }

  navigateToApplyLicense() {
    this.router.navigate(['/apply-license']); // Navigate to Apply License route
  }

  navigateToDonate() {
    window.open('https://nftpuzzle.license-token.com/', '_blank');
  }

  // language=HTML
  description: string = `<p>
    The <b>Open Compensation Token License (OCTL)</b> empowers developers to monetize their open-source work
    while supporting free non-commercial and community-based usage. It provides a unique licensing mechanism
    with compensation tokens, ensuring fair payment for contributors and bridging the gap between corporate profits
    and open-source contributions. OCTL promotes transparency, ownership, and financial opportunities for developers,
    helping grow the open-source ecosystem sustainably.
  </p>
  `;

  // language=HTML
  forYou = `
    The <b>Open Compensation Token License
      (OCTL)</b> offers significant benefits to maintainers, developers, and project owners, addressing key challenges in open-source development:
    <p><b>Fair Compensation:</b> Maintainers get paid when their work is commercially used, ensuring they can
        financially sustain themselves while focusing on developing their projects.</p>
    <p><b>Control Over Licensing:</b> The OCTL empowers project owners to set transparent terms for commercial use
        while still allowing free use for non-commercial contributions.</p>
    <p><b>Encourages Contribution:</b> Developers no longer need to sacrifice financial stability to maintain an
        open-source project, motivating continuous updates, improvements, and innovation.</p>
    <p><b>Increased Recognition:</b> The token model provides clear attribution and proof of ownership, helping
        maintainers gain visibility and respect in the community.</p>
    <p><b>Sustainable Future:</b> By monetizing corporate use, maintainers avoid burnout and can thrive while
        contributing to technology and society.</p>
    The license ensures maintainers are rewarded fairly without compromising their open-source principles.
  `;

  // language=HTML
  forUsers: string = `
    <b>The Open Compensation Token License (OCTL)</b> is beneficial for users because it ensures access to
    high-quality, sustainable open-source projects. Here's why it's good for users:
    <p><b>Enhanced Project Reliability:</b> By compensating developers, projects are better maintained, regularly
      updated, and more secure, providing users with reliable software.</p>

    <p><b>Transparency:</b> The license ensures transparency about project ownership and contributions, giving
      users confidence in the tools they use.</p>

    <p><b>Encourages Innovation:</b> Fair compensation motivates developers to invest more effort and creativity,
      resulting in better features and functionality for users.</p>

    <p><b>Free for Non-Commercial Use:</b> Users contributing to the community or non-commercially using the
      software can still benefit from free access.</p>

    <p><b>Future-Proofing:</b> Sustainable open-source development benefits users in the long term by ensuring
      projects are not abandoned.</p>
    <p>This balance ensures that users benefit from robust, well-supported software.</p>
  `;

  // language=HTML
  forTheWorld: string = `
    <p>
      The <b>Open Compensation Token License (OCTL)</b> fosters a sustainable open-source ecosystem:
    </p>
    <p><strong>Empowering Developers:</strong> It ensures creators are fairly compensated for their work,
    enabling them to dedicate more time and effort to their solutions.</p>
    <p><strong>Sustainability of Open-Source:</strong> By monetizing commercial use, OCTL prevents the
    abandonment of valuable projects, ensuring long-term support and continuous improvement.</p>
    <p><strong>Bridging Corporate Responsibility:</strong> It holds corporations accountable for profiting
    from open-source while supporting fair collaboration with the developer community.</p>
    <p><strong>Open Innovation:</strong> It encourages contributions to open-source, advancing
    technology faster and more collaboratively.</p>
    <p><strong>Access for All:</strong> Non-commercial use remains free, ensuring equitable access to
    tools and knowledge, empowering communities worldwide.</p>
    <p>
      OCTL aligns innovation, fairness, and sustainability to drive global progress.
    </p>
  `;

}


// change to
//
// <mat-card class="why-card">
//   <mat-card-header>
//   <mat-card-title>Speed</mat-card-title>
//   </mat-card-header>
//   <mat-card-content>
//   <p>Unmatched scalability and performance, lightning fast!</p>
// </mat-card-content>
// </mat-card>


// You have a open source project and develop it in your private time?
//   People are using your code and you want to get paid for it?
//                                                             You are a indien-hacker?
//   Large cooperations are using or reselling your code and you get nothing from it?
//   You want to be able to live from your open source work?
//
//
//   what does it for me check
// <!-- Warum macht das die Kunden glücklich -->
// what does it for my users -
// What it does for your users! can use reliable projects
// clear estimation about what it costs
// transparency
// security who was working on the project. Proof of ownership
//
//
// <!-- warum ist das geil für die OS Community -->
// geld verdienen an vorhandenen Projekten
// find supporters more easily
// non-profit use is still free
//
// <!-- warum bringt es die Welt voran-->
// and where do you take me

