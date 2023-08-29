import { Component,Input,Output,EventEmitter,OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-articlevente-pagination',
  templateUrl: './articlevente-pagination.component.html',
  styleUrls: ['./articlevente-pagination.component.css'],
})
export class ArticleventePaginationComponent implements OnChanges {
  @Output() info3 = new EventEmitter<number>();
  @Input() articles: any;
  page: number;
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.articles); 
  }

  onTableDataChange(event) {
    this.page = event;
    this.getArticles();
    this.info3.emit(this.page);
  }
  getArticles() {
    this.articles = this.articles;
  }
}
