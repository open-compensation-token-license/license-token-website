import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JsonLdService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Inject or update JSON-LD metadata in the DOM
   * @param data - JSON-LD metadata to include on the page
   */
  insertJsonLd(data: Record<string, any>): any {
    // Remove any existing JSON-LD script tags
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      this.renderer.removeChild(document.head, existingScript);
    }

    // Create a new JSON-LD script element
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data); // Convert JSON-LD data to a JSON-string

    // Append the new script to the <head>
    this.renderer.appendChild(document.head, script);

    return script
  }
}
