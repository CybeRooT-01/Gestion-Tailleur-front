import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { category } from '../interface/categories';
import { Article } from '../interface/articles';
import { ArticleVenteService } from '../services/article-vente.service';


@Component({
  selector: 'app-article-vente',
  templateUrl: './article-vente.component.html',
  styleUrls: ['./article-vente.component.css'],
})
export class ArticleVenteComponent implements OnInit, OnDestroy {
  Categories: category[];
  Articles: Article[];
  ArticleVente: any

  constructor(
    private Articleservice: ArticleService,
    private Articleventeservice: ArticleVenteService
  ) {}

  ngOnInit(): void {
    this.chargerCategorie();
    this.getArticles();
    this.getAllArticlesVente();
  }

  chargerCategorie() {
    return this.Articleservice.getCategoryVente().subscribe((res) => {
      this.Categories = res;
    });
  }
  getArticles() {
    return this.Articleservice.All().subscribe((res) => {
      this.Articles = res.articles;
    });
  }
  ajouterArticle(article: Article) {    
    return this.Articleventeservice.create(article).subscribe((res) => {
      this.getArticles();
      this.getAllArticlesVente();
    });
  }
  getAllArticlesVente() {
    return this.Articleventeservice.All().subscribe((res) => {
      this.ArticleVente = res.data;      
    });
  }

  ngOnDestroy(): void {}
}
