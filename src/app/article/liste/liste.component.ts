import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { CategorieService } from '../../services/categorie.service';
import { Articles } from 'src/app/interface/Article';
import { Fournisseur } from '../../interface/Fournisseurs';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css'],
})
export class ListeComponent implements OnInit {
  articles: any;
  page: number;
  id: number;
  article: any;
  @Output() info = new EventEmitter<number>();
  @Input() categoryservice: CategorieService;
  ngOnInit(): void {
    this.getDatas();
  }
  constructor() {}
  getDatas() {
    this.categoryservice.getArticleFournisseurCategorie().subscribe((res) => {
      this.articles = res;
      this.articles = this.articles.articles.reverse();
      console.log(this.articles);
    });
  }
  getActivePage(event) {
    this.page = event;
    console.log(this.page);
  }
  isEditMode: boolean = false;

  @Output() info2 = new EventEmitter();

  checkIdToDelete(id: number) {
    this.id = id;
    this.info.emit(this.id);
  }

  dataToUpdate(article) {
    this.article = article;
    this.info2.emit(this.article);
    // console.log('cet article laaaaaaaaaaaaaaa: ' + article);
  }
}
