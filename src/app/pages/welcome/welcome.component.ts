import {Component} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatCardModule} from '@angular/material/card';
import {Router} from "@angular/router"
import {MatList, MatListItem} from '@angular/material/list';
import {NgForOf} from '@angular/common';

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
    MatList,
    MatListItem,
    NgForOf,
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

  whyItems = [
    { icon: 'task_alt', text: 'You have an open-source project and develop it in your private time?' },
    { icon: 'task_alt', text: 'People are using your code, and you want to get paid for it?' },
    { icon: 'task_alt', text: 'You are an indie-hacker?' },
    { icon: 'task_alt', text: 'Large corporations are using or reselling your code, and you get nothing from it?' },
    { icon: 'task_alt', text: 'You want to be able to live from your open-source work?' }
  ];

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

