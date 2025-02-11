import {HttpClient} from '@angular/common/http';
import {MarkdownComponent} from 'ngx-markdown';
import {Component, ElementRef, inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatLine} from '@angular/material/core';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput, MatInputModule} from '@angular/material/input';
import {map, switchMap, tap} from 'rxjs';
import {JsonLdService} from '../../services/json-ld.service';
import {Article, ArticleHtmlMetadata} from './article';
import {Meta, Title} from '@angular/platform-browser';

interface RouteParams {
  slug?: string;
}

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  imports: [
    MarkdownComponent,
    MatNavList,
    MatListItem,
    MatIcon,
    MatIconButton,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatLine,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormField,
    FormsModule,
    MatInput,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    CommonModule

  ],
  styleUrls: ['./articles.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticlesComponent implements OnInit {
  articlesList: Article[] = [];

  activeFile: string | undefined;      // The currently active file path
  activeContent: string | undefined;   // The currently loaded file content
  contentMessage: string | undefined;
  searchResults: { title: string; slug: string }[] = [];
  searchQuery: string = "";
  showSearch: boolean = false;

  httpClient: HttpClient = inject(HttpClient);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  metaService = inject(Meta);
  titleService = inject(Title);
  jsonLdService = inject(JsonLdService);

  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild('searchField') searchField?: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: RouteParams) => {
          let slug = params.slug || '';
          slug = slug.replace(/\.html$/, '');

          return this.httpClient
            .get<Article[]>('assets/articles.json')
            .pipe(
              tap(articlesListData => {
                  this.articlesList = articlesListData
                }
              ),
              map(() => slug)
            );
        })
      )
      .subscribe(slug => {
        if (!slug) {
          // No article requested
          this.activeFile = undefined;
          this.activeContent = undefined;
          this.sidenav.close()
          this.contentMessage = "Hey there, choose one of these articles or use the search";
          return;
        }

        // Find the requested article and load its content
        const article = this.articlesList.find(a => a.slug === slug);
        if (article) {
          this.activeFile = article.markdownFile;
          this.loadMarkdown(article.markdownFile);
          this.loadAndSetJsonLD(article.jsonldFile);
          this.loadAndSetHtmlMetadata(article.htmlMetadataFile);
        } else {
          // No article from requested slug not found
          this.activeFile = undefined;
          this.activeContent = undefined;
          this.contentMessage = `Article "${slug}" NOT FOUND. Here are the articles we have or use the search`;
          this.sidenav.close()
          return;
        }
      });
  }


  private loadMarkdown(filePath: string): void {
    this.httpClient.get(filePath, {responseType: 'text'}).subscribe({
      next: content => {
        this.activeContent = content;
      },
      error: err => {
        console.error(`Error loading Markdown file: ${filePath}`, err);
        this.activeContent = undefined;
      }
    });
  }

  getArticleLink(article: { slug: string }): string {
    return `/wiki/${article.slug}`;
  }

  navigateToArticle(article: { slug: string }): void {
    this.router.navigate([this.getArticleLink(article)]);
    this.clearSearch();
  }

  private loadAndSetHtmlMetadata(filePath: string): void {
    this.httpClient.get<ArticleHtmlMetadata>(filePath, {responseType: "json"}).subscribe({
      next: metadata => {
        this.titleService.setTitle(metadata.title);
        this.metaService.updateTag({name: 'description', content: metadata.description});
        this.metaService.updateTag({name: 'keywords', content: metadata.keywords});
      },
      error: err => {
        console.error(`Error loading Metadata file: ${filePath}`, err);
      }
    });
  }

  private loadAndSetJsonLD(filePath: string) {
    this.httpClient.get(filePath, {responseType: "json"}).subscribe({
      next: jsonLdData => {
        this.jsonLdService.insertJsonLd(jsonLdData);
      },
      error: err => {
        console.error(`Error loading JSONLD file: ${filePath}`, err);
      }
    });
  }


  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      setTimeout(() => {
        this.searchField?.nativeElement.focus();
        this.searchField?.nativeElement.select();
      })
    }
  }

  searchArticles(): void {
    const query = this.searchQuery.toLowerCase();
    this.searchResults = this.articlesList.filter(article =>
      article.title.toLowerCase().includes(query)
    );
  }

  clearSearch(): void {
    this.searchQuery = "";
    this.searchResults = [];
    this.showSearch = false;
  }

  public getNextArticle(): Article | undefined {
    if (!this.activeFile) return undefined;
    const currentIndex = this.articlesList.findIndex(article => article.markdownFile === this.activeFile);
    if (currentIndex > -1 && currentIndex < this.articlesList.length - 1) {
      return this.articlesList[currentIndex + 1];
    }
    return this.articlesList[0];
  }

  getFormattedLastModified(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', month: 'long', day: 'numeric'
    };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  getArticleLastModified(): Date {
    if (!this.activeFile) {
      return new Date();
    }
    const article = this.articlesList.find(a => a.markdownFile === this.activeFile);
    return article ? new Date(article.lastModified) : new Date();
  }

}
