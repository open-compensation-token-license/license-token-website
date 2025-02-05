export interface Article {
  title: string;
  slug: string;
  markdownFile: string;
  jsonldFile: string;
  htmlMetadataFile: string;
  lastModified: Date;
}

export interface ArticleHtmlMetadata {
  title: string;
  description: string;
  keywords: string;
}
