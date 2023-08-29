import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: '[app-item-vente]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnInit(): void {}
  @Input() ArticleVente: any;
  @Output() ArticleToEdit = new EventEmitter<number>();
  @Input() page: number;
  count: number = 0;
  tableSize: number = 1;
  tableSizes: number[] = [3, 6, 9, 12];
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
  @Output() ArticleToDelete = new EventEmitter<number>();
  supprimerDefinitivement(article) {
    this.clearCountdown(article);
    this.ArticleToDelete.emit(article.id);
  }
  editArticle(id: number) {
    // console.log(id);
    this.ArticleToEdit.emit(id);
  }
}
