import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { CategorieService } from '../../services/categorie.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Fournisseur } from 'src/app/interface/Fournisseurs';
import { NgForm,FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  stock: number = 0;
  categories: any;
  imageFile: any = '';
  categoryId: number;
  num: number = 1;
  selectedFournisseurs: number[] = [];
  libelleValue: string = '';
  libCode: string = '';
  fournisseurs: any;
  searchTerm: string = '';
  filteredFournisseurs: Fournisseur[] = [];
  selectedFournisseursName: string[] = [];
  getSelectedCategory: string = '';
  ref: string = 'REF-';
  extension: string = '';
  extensionsAutorised = ['jpg', 'jpeg', 'png', 'jfif'];
  @Input() chargerCategorie: any;

  @Input() categoryservice: CategorieService;
  @Output() info = new EventEmitter();

  selectedStyle = {
    background: 'gray',
    color: 'white',
  };

  defaultStyle = {
    background: '#fff',
  };
  constructor() {}
  ngOnInit(): void {
    this.chargerCategorie();
    console.log(this.categoryservice);
  }
  getValue() {
    this.libCode =
      this.libelleValue[0] + this.libelleValue[1] + this.libelleValue[2];
  }
  dataToInsert = {
    libelle: '',
    reference: this.ref,
    image: this.imageFile,
    fournisseur: this.selectedFournisseurs,
    categorie: 0,
    prix: 0,
    stock: 0,
  };
  onFileChange(event: any) {
    console.log(this.libCode);
    this.imageFile = event.target.files[0];

    this.dataToInsert.image = this.imageFile;

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
  getAllFournisseur() {
    this.categoryservice.getFournisseurs().subscribe((data) => {
      this.fournisseurs = data;
      console.log(this.fournisseurs);

      const filteredFournisseurs = this.fournisseurs.filter((fournisseur) => {
        return fournisseur.nom
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      });
      this.fournisseurs = filteredFournisseurs;
      this.filteredFournisseurs = filteredFournisseurs;
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
  onCategoryChange(event: any) {
    this.categoryId = event.target.options.selectedIndex;
  }
  libelle = new FormControl('');
  prixArticle = new FormControl('');
  stockArticle = new FormControl('');
  check(form: NgForm) {
    console.log(this.ref);
    
    const newLibelle = this.libelle.value;
    const newPrix = this.prixArticle.value;
    const newStock = this.stockArticle.value;
    this.dataToInsert.libelle = newLibelle;
    this.dataToInsert.prix = +newPrix;
    this.dataToInsert.stock = +newStock;
    this.dataToInsert.reference = this.ref;
    this.dataToInsert.fournisseur = this.selectedFournisseurs;
    this.dataToInsert.image = this.imageFile;
    this.dataToInsert.categorie = this.categoryId;
    this.info.emit(this.dataToInsert);
  }
}
