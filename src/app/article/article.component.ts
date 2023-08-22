import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategorieService } from '../services/categorie.service';
import { NgForm, FormControl } from '@angular/forms';
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
  toInsert: any;
  constructor(private categorieService: CategorieService) {}
  ngOnInit(): void {}
  categoryservice: CategorieService = this.categorieService;
  ajouterArticle(data: any) {
    // this.toInsert = data;
    // console.log(data);
    this.categoryservice.addArticle(data).subscribe((data) => {
      if (data) {
        this.toInsert = data;
        console.log(this.toInsert); //id
        Swal.fire('Good job!', 'Article Ajouté avec success', 'success');
        const toInsertRow = document.querySelector('.toInsertRow');
        // let tr = `
        //   <tr class="d-flex justify-content-between" id="${this.toInsert.id}">
        //   <td></td>
        //   <td>${this.toInsert.article.prix}</td>
        //   <td style="margin-left: 0px">${this.toInsert.article.stock}</td>
        //   <td>${this.toInsert.article.libelle}</td>
        //   <td>
        //     <button class="btn btn-sm btn-warning editButton" style="margin-right: 15px"  (click)="onEditClick(article)" disabled>
        //       Edit
        //     </button>
        //     <button
        //       class="btn btn-sm btn-danger"
        //       (click)="confirmDelete(article)"
        //       *ngIf="!article.confirmingDelete; else confirmingDelete">
        //       Supprimer
        //     </button>
        //     <ng-template #confirmingDelete>
        //       <button class="btn btn-sm btn-danger" (click)="supprimerDefinitivement(article)">
        //         OK &nbsp;&nbsp;&nbsp; {{article.countdown}} &nbsp;&nbsp;&nbsp;&nbsp;
        //       </button>
        //     </ng-template>
        //   </td>
        // </tr>`;
        // console.log(toInsertRow);
        window.location.reload();
      }
    });
  }
  supprimerArticle(id: number) {
    this.categoryservice.deleteArticle(id).subscribe((data) => {
      if (data) {
        Swal.fire(
          'Good job!',
          'getElementByIdsupprimé avec success',
          'success'
        );
        const trToRemove = document.getElementById(id.toString());
        trToRemove?.remove();
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
        // window.location.reload();
        const toInsertRow = document.querySelector('.toInsertRow');
      }
    });
  }
}
