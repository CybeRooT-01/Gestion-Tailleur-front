import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input() articles: any;

  @Output() info = new EventEmitter<number>();

  @Output() info2 = new EventEmitter();

  onEditClick(article) {
    this.info2.emit(article);
  }
  count: number = 0;
  @Input() page: number;
  tableSize: number = 3;
  tableSizes: number[] = [3, 6, 9, 12];
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
    this.info.emit(article.id);
  }
}
