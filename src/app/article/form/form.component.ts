import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../../services/categorie.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  imageFile: any;
  fournisseurs: any;
  searchTerm: string = '';
  extension: string = '';
  pathToImage: string = '';
  imageEnBase64: string = '';
  getSelectedCategory: string = '';
  extensionsAutorised = ['jpg', 'jpeg', 'png', 'jfif'];
  filteredFournisseurs: string[] = [];
  libelleValue: string = '';
  libCode: string = '';
  ref: string = 'REF-';
  categories: any;
  selectedFournisseur: any;
  num: number = 1;
  categoryId: number;
  prix: number = 0;
  stock: number = 0;

  constructor(private categorieService: CategorieService) {}
  ngOnInit(): void {
    this.chargerCategorie();
    // this.getAllFournisseur();
    // this.getCurrentTermSearch()
  }

  onFileChange(event: any) {
    console.log(this.libCode);
    this.imageFile = event.target.files[0];
    this.extension = this.imageFile.name.split('.')[1];
    if (!this.extensionsAutorised.includes(this.extension)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Vous devez choisir une image',
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.imageFile = reader.result as string;
    };
    reader.readAsDataURL(this.imageFile);
  }
  getValue() {
    this.libCode =
      this.libelleValue[0] + this.libelleValue[1] + this.libelleValue[2];
  }

  chargerCategorie() {
    this.categorieService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  getAllFournisseur() {
    this.categorieService.getFournisseurs().subscribe((data) => {
      this.fournisseurs = data;
      const filteredFournisseurs = this.fournisseurs.filter(
        (fournisseur: any) => {
          return fournisseur.nom
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());
        }
      );
      this.fournisseurs = filteredFournisseurs;
      this.filteredFournisseurs = filteredFournisseurs;
      // console.log(this.fournisseurs);
      if (this.searchTerm == '') {
        this.fournisseurs = [];
        this.filteredFournisseurs = [];
      }
      console.log(this.filteredFournisseurs);
    });
  }
  selectFournisseur(fournisseur: any) {
    this.selectedFournisseur = fournisseur;
    this.fournisseurs = this.fournisseurs.filter((f: any) => {
      return f.id != fournisseur.id;
    });
    this.searchTerm = fournisseur.nom;
  }
  onInputChange() {
    this.selectedFournisseur = null;
  }
  updateref() {
    const libCode = this.libCode.substring(0, 3);
    let ref = 'REF-' + libCode.toUpperCase();
    ref += '-' + this.getSelectedCategory.toUpperCase();
    ref += '-' + this.num;
    this.ref = ref;
  }
  onCategoryChange(event) {
    this.categoryId = event.target.options.selectedIndex;
  }
  ajouterArticle() {
    const data = {
      libelle: this.libelleValue,
      reference: this.ref,
      image: this.imageFile,
      fournisseur: this.selectedFournisseur.id,
      categorie: this.categoryId,
      prix: this.prix,
      stock: this.stock,
    };
    this.categorieService.addArticle(data).subscribe((data) => {
      this.num++;
      if (data) {
        Swal.fire('Good job!', 'Categorie Ajouté avec success', 'success');
      }
    });
  }
}
