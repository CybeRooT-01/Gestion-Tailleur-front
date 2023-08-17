import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../services/categorie.service';
import { NgForm , FormControl} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
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
  selectedFournisseurs: any[] = [];
  num: number = 1;
  categoryId: number;
  prix: number = 0;
  stock: number = 0;
  selectedFournisseursName: string[] = [];

  constructor(private categorieService: CategorieService) {}
  ngOnInit(): void {
    this.chargerCategorie();
    // console.log(this.selectedFournisseurs);
  }
  categoryservice: CategorieService = this.categorieService;

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
    this.categoryservice.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  getAllFournisseur() {
    this.categoryservice.getFournisseurs().subscribe((data) => {
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
    this.selectedFournisseurs.push(fournisseur.id);
    this.selectedFournisseursName.push(fournisseur.nom);

    console.log(this.selectedFournisseurs);
    fournisseur.selected = true;
    this.searchTerm = this.selectedFournisseursName.map((f) => f).join(', ');
  }
  deselectFournisseur(fournisseur: any) {
    this.selectedFournisseurs = this.selectedFournisseurs.filter(
      (f) => f !== fournisseur.id
    );
    console.log(this.selectedFournisseurs);
    fournisseur.selected = false;
    this.selectedFournisseursName = this.selectedFournisseursName.filter(
      (f) => f !== fournisseur.nom
    );
    this.searchTerm = this.selectedFournisseursName.map((f) => f).join(', ');
  }
  onInputChange() {
    this.selectedFournisseurs = [];
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
  ajouterArticle(form: NgForm) {
    const data = {
      libelle: this.libelleValue,
      reference: this.ref,
      image: this.imageFile,
      fournisseur: this.selectedFournisseurs,
      categorie: this.categoryId,
      prix: this.prix,
      stock: this.stock,
    };
    console.log(data);

    this.categoryservice.addArticle(data).subscribe((data) => {
      this.num++;
      if (data) {
        Swal.fire('Good job!', 'Categorie Ajouté avec success', 'success');
      }
    });
  }
}