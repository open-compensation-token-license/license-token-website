import {Component,} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatCardModule} from '@angular/material/card';
import {Router} from "@angular/router"
import {NgForOf} from '@angular/common';
import {MatTooltip} from '@angular/material/tooltip';

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
    NgForOf,
    MatTooltip,
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
    this.router.navigate(['/apply-license']);
  }


  contactUs() {
    window.open('mailto:augmenta@iunera.com', '_self');
  }

  navigateToDonate() {
    window.open('https://nftpuzzle.license-token.com/', '_blank');
  }

  why = {

    title: 'What does it?',
    // language=HTML max_line_length = 80
    description: `<p>
      The <b>Open Compensation Token License (OCTL)</b> provides a unique blockchain based licensing mechanism. This ensures fair and transparent payment for
      contributors, while allowing the source code to be publicly available and to be re-used or advanced in other projects. As a result of this a naturally
      sustainable ecosystem of public available source code fostered sustainably.
    </p>`,

    cards: [
      {
        title: 'Whats in it for you?',
        icon: 'person',
        // language=HTML
        description: `
          <p>How Token-Based Licensing Supports Your Work</p>
          <p>Your source code can still be available in the web a without having to worry about copycats.</p>
          <p>You'll receive an income stream from the foundation of your code: getting paid when your source code is
            commercially applied while ensuring that forking and collaborations remain possible and your development efforts are not in vain.</p>
          <p>Even though you earn from commercial applications, you still give back to the community by allowing free use for non-commercial contributions.</p>
          <p>Increased recognition and transparency: The token model provides clear attribution and proof of ownership, enabling maintainers to gain visibility
            and respect within the community.</p>
        `
      },
      {
        title: 'Supporting your customers',
        icon: 'people',
        // language=HTML
        description: `
          <b>The Open Compensation Token License
            (OCTL)</b> is beneficial for users because it ensures access to high-quality, sustainable open-source projects Here's why it's good for users:
          <p><b>Enhanced Project Reliability:</b> By compensating developers, projects are better maintained, regularly updated, and more secure, providing
            users with reliable software.</p>
          <p><b>Increased Transparency:</b> Project ownership and contributions are transparently tracked with the blockchain. </p>
          <p><b>Encourages Innovation:</b> Fair compensation motivates developers to invest more effort and creativity, resulting in better features and
            functionality for users and faster innovation cycles</p>
        `
      },
      {
        title: 'Creates a better world',
        icon: 'public',
        // language=HTML
        description: `
          <p> The <b>Open Compensation Token License (OCTL)</b> fosters a sustainable open-source ecosystem: </p>
          <p><strong>Sustainability of open source:</strong> The abandonment of valuable projects is reduced, because of
            direct support of the used projects. This ensures long-term support and continuous improvement.</p>
          <p><strong>Open Innovation:</strong> It encourages contributions to open-source, advancing technology faster and more collaboratively.</p>
          <p><strong>Access for All:</strong> Non-commercial use remains free, ensuring equitable access to tools and knowledge, empowering communities
            worldwide.</p>
        `
      }
    ]
  }

  whyNoOpensource: string = 'The term "Open Source" is not a legally protected term. However, it is closely associated with specific definitions and standards established by organizations like the Open Source Initiative (OSI). This means its use is tied to compliance with those standards, particularly in the context of software and licenses. We think developers shall be paid for their work, and we believe that the OCTL is a good way to do that. No need to fight the wordings...';

  knowFrom = {
    title: 'You know our tech from',
    subTitle: 'Our work has been recognized and featured by industry-leading platforms:',
    points: [
      {
        title: 'Fahrbar20',
        link: 'https://www.iunera.com/kraken/big-data-examples/how-nfts-and-ai-can-solve-public-transport-challenges/',
        image: 'assets/images/logo-fahrbar20.svg',
        alt: 'Fahrbar20',
        subtitle: 'NFTs and AI solving public transport challenges',
      },
      {
        title: 'Tracking, Prediction and Analytics',
        link: 'https://www.iunera.com/kraken/big-data-examples/third-party-data-geotracking-coronavirus/',
        image: 'assets/images/logo-trackingapp.png',
        alt: 'Tracking App',
        subtitle: 'Insights from Covid pandemic tracking apps',
      },
      {
        title: 'AI Social Altcoin Analytics',
        link: 'https://www.youtube.com/watch?v=4tv_L7W76b8',
        image: 'assets/images/logo-scoinanalytics.png',
        alt: 'Scoinanalytics',
        subtitle: 'AI-powered altcoin trends and tweetbot'
      },
      {
        title: 'AI Analytics of German Federal Election',
        link: 'https://www.iunera.com/kraken/projects/baden-tv-interview-dr-frey-bundestagswahlanalyse/',
        image: 'assets/images/logo-bundestagswahlanalyse.png',
        alt: 'Election Analytics',
        subtitle: 'In-depth election analysis powered by AI'
      },
      {
        title: 'Swarm Travel Guide Apps',
        link: 'https://www.chip.de/downloads/Stappz-Android-App_74740571.html',
        image: 'assets/images/logo-stappz.png',
        alt: 'Stappz',
        subtitle: 'Discover destinations with travel guide apps'
      },
    ],
  }

}
