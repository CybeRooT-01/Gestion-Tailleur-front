import { Component,Input, OnInit } from '@angular/core';
import { CategorieService } from '../../services/categorie.service';
import { Articles } from 'src/app/interface/Article';



@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css'],
})
export class ListeComponent implements OnInit {
  articles: any;
  @Input() categoryservice: CategorieService;
  ngOnInit(): void {
    this.getDatas();
  }
  constructor() {}

  getDatas() {
    this.categoryservice.getArticleFournisseurCategorie().subscribe((res) => {
      this.articles = res;
      this.articles = this.articles.articles;
      console.log(this.articles.articles);
    });
  }
}
