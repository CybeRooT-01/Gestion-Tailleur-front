import { Component, Input,Output,EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { category } from 'src/app/interface/categories';
import { Article } from '../../interface/articles';

@Component({
  selector: 'app-list-vente',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnChanges {
  @Input() ArticleVente: any;
  @Output() ArticleToEdit = new EventEmitter<number>();
  @Output() ArticleToDelete = new EventEmitter<number>();

  @Input() Article: any;
  page: number;

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.ArticleVente);
  }
  getIDArticleToEdit(id: number) {
    this.ArticleToEdit.emit(id);
  }
  getIDArticleToDelet(id: number) {
    this.ArticleToDelete.emit(id);
  }
  getActivePage(event) {
    this.page = event;
    console.log(this.page);
  }
}
