import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input() articles: any;
  constructor() {}

  ngOnInit(): void {}
  confirmDelete(article) {
    article.confirmingDelete = true;
    article.countdown = 3;

    const countdownInterval = setInterval(() => {
      article.countdown--;
      if (article.countdown <= 0) {
        this.clearCountdown(article);
      }
    }, 1000);
    article.countdownInterval = countdownInterval;

    console.log('hello');
  }
  clearCountdown(article) {
    clearInterval(article.countdownInterval);
    article.confirmingDelete = false;
    article.countdown = null;
  }
  supprimerDefinitivement(article) {
    this.clearCountdown(article);
    console.log('supprimer');
  }
}
