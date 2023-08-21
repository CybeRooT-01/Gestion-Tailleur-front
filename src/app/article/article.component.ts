import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategorieService } from '../services/categorie.service';
import { NgForm , FormControl} from '@angular/forms';
import Swal from 'sweetalert2';
import { Fournisseur } from '../interface/Fournisseurs';
import { category } from '../interface/categories';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  categories: category[] = [];
  articles: any;
  article: any;
  datas: any;
  constructor(private categorieService: CategorieService) {}
  ngOnInit(): void {}
  categoryservice: CategorieService = this.categorieService;
  ajouterArticle(data: any) {
    console.log(data);
    this.categoryservice.addArticle(data).subscribe((data) => {
      if (data) {
        Swal.fire('Good job!', 'Article Ajouté avec success', 'success');
        window.location.reload();
      }
    });
  }
  supprimerArticle(id: number) {
    this.categoryservice.deleteArticle(id).subscribe((data) => {
      if (data) {
        Swal.fire('Good job!', 'Article supprimé avec success', 'success');
        window.location.reload();
      }
    });
  }
  getDataToUpdate(data: any) {
    this.article = data;
    let id = this.article.id;
    console.log(this.article);
  }
  updateArticle(data: any) {
    let id = this.article.id;
    this.categoryservice.PutArticle(data, id).subscribe((data) => {
      if (data) {
        Swal.fire('Good job!', 'Article modifié avec success', 'success');
        window.location.reload();
      }
    });
  }
    
}