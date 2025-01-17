import { TestBed } from '@angular/core/testing';
import { JsonLdService } from './json-ld.service';

describe('JsonLdService', () => {
  let service: JsonLdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonLdService);
  });

  it('should generate JSON-LD correctly', () => {
    const data = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "John Doe",
      "jobTitle": "Software Engineer"
    };
    const jsonLdOutput = service.insertJsonLd(data);

    expect(jsonLdOutput).toContain('"@type": "Person"');
    expect(jsonLdOutput).toContain('"name": "John Doe"');
  });
});
