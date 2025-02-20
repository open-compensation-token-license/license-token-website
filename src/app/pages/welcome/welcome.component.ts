import {Component, inject, OnInit,} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatCardModule} from '@angular/material/card';
import {Router, RouterLink} from "@angular/router"
import {NgForOf} from '@angular/common';
import {MatTooltip} from '@angular/material/tooltip';
import {Article} from '../articles/article';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, forkJoin, map} from 'rxjs';

import {Title, Meta} from '@angular/platform-browser';


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
      RouterLink,
    ],
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
  }
)

export class WelcomeComponent implements OnInit {
  router: Router = inject(Router);
  metaService = inject(Meta);
  titleService = inject(Title);
  why = {

    title: 'What does it do?',
    // language=HTML max_line_length = 80
    description: `<p>
      The <b>Open Compensation Token License (OCTL)</b> provides a unique blockchain based licensing mechanism. This ensures fair and transparent payment for
      contributors, while allowing the source code to be publicly available and to be re-used or advanced in other projects. As a result of this a naturally
      sustainable ecosystem of public available source code fostered sustainably.
    </p>`,

    cards: [
      {
        title: 'Whats in it for you',
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
        image: 'assets/images/logo-trackingapp.webp',
        alt: 'Tracking App',
        subtitle: 'Insights from Covid pandemic tracking apps',
      },
      {
        title: 'AI Social Altcoin Analytics',
        link: 'https://www.youtube.com/watch?v=4tv_L7W76b8',
        image: 'assets/images/logo-scoinanalytics.webp',
        alt: 'Scoinanalytics',
        subtitle: 'AI-powered altcoin trends and tweetbot'
      },
      {
        title: 'AI Analytics of German Federal Election',
        link: 'https://www.iunera.com/kraken/projects/baden-tv-interview-dr-frey-bundestagswahlanalyse/',
        image: 'assets/images/logo-bundestagswahlanalyse.webp',
        alt: 'Election Analytics',
        subtitle: 'In-depth election analysis powered by AI'
      },
      {
        title: 'Swarm Travel Guide Apps',
        link: 'https://www.chip.de/downloads/Stappz-Android-App_74740571.html',
        image: 'assets/images/logo-stappz.webp',
        alt: 'Stappz',
        subtitle: 'Discover destinations with travel guide apps'
      },
    ],
  }
  wikiEntries: { title: string; excerpt: string; link: string }[] = [];
  httpClient: HttpClient = inject(HttpClient);

  ngOnInit(): void {
    this.loadLatestWikiEntries();
    this.titleService.setTitle('Welcome - Open Compensation Token License');
    this.metaService.addTags([
      {
        name: 'description',
        content: 'Learn about the Open Compensation Token License (OCTL), a blockchain-based license ensuring fair compensation for contributors to open-source code while fostering collaboration and transparency.'
      },
      {name: 'keywords', content: 'Open Source, Compensation Token, OCTL, Blockchain, Licensing, Sustainability, Open Source Compensation'}
    ]);
  }

  scrollToSection() {
    const target = document.getElementById('content');
    if (target) {
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }


  navigateToDonate() {
    window.open('https://nftpuzzle.license-token.com/', '_blank');
  }

  navigateToWhitepaper() {
    window.open('https://github.com/open-compensation-token-license/octl/blob/main/octl-whitepaper.md', '_blank');
  }

  private async loadLatestWikiEntries(): Promise<void> {
    // Fetch all articles
    const articles = await firstValueFrom(
      this.httpClient.get<Article[]>('assets/articles.json')
    );

    // Sort by lastModified descending
    const sorted = [...articles].sort((a, b) =>
      new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
    );

    // Take the latest 3
    const latest = sorted.slice(0, 3);

    // Fetch each markdown, generate an excerpt, and build data
    const requests = latest.map(article =>
      this.httpClient
        .get(article.markdownFile, {responseType: 'text'})
        .pipe(
          map(rawMarkdown => {
            const excerpt = this.generateExcerpt(rawMarkdown);
            return {
              link: `/wiki/${article.slug}`,
              title: article.title,
              excerpt
            };
          })
        )
    );

    this.wikiEntries = await firstValueFrom(forkJoin(requests));
  }

  private generateExcerpt(markdown: string): string {
    // A simple approach: split by period (.) or line break to get sentences
    // then rejoin the first two. You can refine as needed.
    let excerpt = '';
    const sentenceSplit = markdown
      .replace(/\r?\n|\r/g, ' ')
      .replace(/#/, '')
      .split(/(?<=[.?!])\s+/g); // naive sentence boundary

    const firstTwo = sentenceSplit.slice(0, 2).join(' ');
    excerpt = firstTwo.trim();

    let maxLength = 290;
    // If over 290 chars, ellipsis
    if (excerpt.length > maxLength) {
      excerpt = excerpt.slice(0, maxLength).trimEnd() + '...';
    }
    return excerpt;
  }

}
