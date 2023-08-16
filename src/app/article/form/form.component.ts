import { Component, OnInit, Input } from '@angular/core';
import { CategorieService } from '../../services/categorie.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Input() imageFile: any;
  @Input() fournisseurs: any;
  @Input() extension: string = '';
  @Input() searchTerm: string = '';
  @Input() pathToImage: string = '';
  @Input() imageEnBase64: string = '';
  @Input() getSelectedCategory: string = '';
  @Input() extensionsAutorised = ['jpg', 'jpeg', 'png', 'jfif'];
  @Input() filteredFournisseurs: string[] = [];
  @Input() libelleValue: string = '';
  @Input() libCode: string = '';
  @Input() ref: string = 'REF-';
  @Input() categories: any;
  @Input() selectedFournisseurs: any[] = [];
  @Input() num: number = 1;
  @Input() categoryId: number;
  @Input() prix: number = 0;
  @Input() stock: number = 0;
  @Input() getValue: any;
  @Input() updateref: any;
  @Input() onCategoryChange: any;
  @Input() getAllFournisseur: any;
  @Input() onInputChange: any;
  @Input() ajouterArticle: any;
  @Input() onFileChange: any;
  @Input() selectFournisseur: any;
  @Input() chargerCategorie: any;
  @Input() deselectFournisseur: any;
  @Input() selectedFournisseursName: string[] = [];
  @Input() categoryservice: CategorieService;

  selectedStyle = {
    background: 'gray',
  };

  defaultStyle = {
    background: '#333',
  };
  constructor() {}
  ngOnInit(): void {
    // console.log(this.selectFournisseur);

    this.chargerCategorie();
  }
}
