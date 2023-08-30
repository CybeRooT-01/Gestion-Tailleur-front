import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { category } from '../interface/categories';
import { Article } from '../interface/articles';
import { ArticleVenteService } from '../services/article-vente.service';
import { Tailles } from '../interface/tailles';


@Component({
  selector: 'app-article-vente',
  templateUrl: './article-vente.component.html',
  styleUrls: ['./article-vente.component.css'],
})
export class ArticleVenteComponent implements OnInit, OnDestroy {
  Categories: category[];
  Articles: Article[];
  ArticleVente: any;
  tailles:Tailles[]
  @Output() ArticleToPagine = new EventEmitter();

  constructor(
    private Articleservice: ArticleService,
    private Articleventeservice: ArticleVenteService
  ) {}

  ngOnInit(): void {
    this.chargerCategorie();
    this.getArticles();
    this.getAllArticlesVente();
    this.getTailles()
  }
  getTailles() {
    this.Articleventeservice.getAllTailles().subscribe((res) => {
      this.tailles = res.tailles;
      
    })
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
  ArticleVenteToEdit: any;
  getArticleIdToEdit(id: number) {
    this.Articleventeservice.getById(id).subscribe((res) => {
      this.ArticleVenteToEdit = res.data;
      console.log(this.ArticleVenteToEdit);
    });
  }
  getArticleIdToDelete(id: number) {
    this.Articleventeservice.delete(id).subscribe((res) => {
      console.log(res);
      
      this.getAllArticlesVente();
    });
  }
    
  getArticleVenteToEdit(article: any) {
    return this.Articleventeservice.update(article).subscribe((res) => {
      this.getAllArticlesVente();
      console.log(res);
    });
  }
  supprimerArticleVente(id: number) {
    return this.Articleventeservice.delete(id).subscribe((res) => {
      this.getAllArticlesVente();
    });
  }

  ngOnDestroy(): void {}
}
