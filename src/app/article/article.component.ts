import { Component, OnInit } from '@angular/core';
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

  constructor(private categorieService: CategorieService) {}
  ngOnInit(): void {
    this.chargerCategorie();
  }
  categoryservice: CategorieService = this.categorieService;

  chargerCategorie() {
    this.categoryservice.getCategories().subscribe((data) => {
      this.categories = data;
      console.log(this.categories);
    });
  }
  ajouterArticle(data : any) {
    console.log(data);
    this.categoryservice.addArticle(data).subscribe((data) => {
      if (data) {
        Swal.fire('Good job!', 'Categorie Ajouté avec success', 'success');
      }
    });
  }
}