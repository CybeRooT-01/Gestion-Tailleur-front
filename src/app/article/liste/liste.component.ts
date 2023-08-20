import { Component,Input, OnInit,Output,EventEmitter } from '@angular/core';
import { CategorieService } from '../../services/categorie.service';
import { Articles } from 'src/app/interface/Article';



@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css'],
})
export class ListeComponent implements OnInit {
  articles: any;
  id: number;
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
      // console.log(this.articles.articles);
    });
  }

  checkIdToDelete(id: number) {
    this.id = id;
    this.info.emit(this.id);
    // console.log("cet id laaaaaaaaaaaaaaa: " +id);
  }
    
}
