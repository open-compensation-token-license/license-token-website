import {Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {OEmbedComponent} from '../../components/oembed/oembed.component';

@Component({
  selector: 'app-contact',
  imports: [
    NgOptimizedImage,
    OEmbedComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
