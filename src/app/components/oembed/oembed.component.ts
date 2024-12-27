import {Component, inject, Input, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {OEmbedService} from '../../services/oembed.service';

@Component({
  selector: 'app-oembed',
  standalone: true,
  template: `
    <div *ngIf="oembedData" [innerHTML]="oembedData"></div>
  `,
  imports: [
    NgIf
  ],
  styleUrls: ['./oembed.component.scss']
})

export class OEmbedComponent implements OnInit {
  @Input() oembedUrl!: string;
  oembedData: any;

  oembedService: OEmbedService = inject(OEmbedService);

  ngOnInit(): void {
    // @ts-ignore
    this.oembedService.fetchOEmbedData(this.oembedUrl).subscribe(data => {
      this.oembedData = data;
    });
  }
}
