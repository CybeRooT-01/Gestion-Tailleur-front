import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() articles: any;
  @Output() info3 = new EventEmitter<number>();
  page: number;

  onTableDataChange(event) {
    this.page = event;
    this.getArticles();
    this.info3.emit(this.page);
  }
  getArticles() {
    this.articles = this.articles;
  }
}
