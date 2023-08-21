import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategorieService } from '../../services/categorie.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Fournisseur } from 'src/app/interface/Fournisseurs';
import { NgForm, FormControl, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
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
  dropdownSettings = {};
  selectedFournisseursByLibs = [];
  isEditMode: boolean = false;
  ajout: boolean = true;
  edit: boolean = false;
  @Input() article: any;
  // selectedFournisseursByLibs = [];

  @Input() categoryservice: CategorieService;
  @Output() info = new EventEmitter();
  @Output() info2 = new EventEmitter();

  selectedStyle = {
    background: 'gray',
    color: 'white',
  };

  defaultStyle = {
    background: '#fff',
  };
  showSaveButton = true;
  changeMode() {
    this.ajout = !this.ajout;
    this.edit = !this.edit;
    const editButton = document.querySelectorAll('.editButton');
    if(this.edit){
      editButton.forEach((btn: HTMLButtonElement) => {
        btn.disabled = false;
      });
    } else {
      editButton.forEach((btn: HTMLButtonElement) => {
        btn.disabled = true;
      });
    }

  }
  //   EditOrAdd() {
  //     const editButton = document.querySelectorAll('.editButton')
  //     console.log(editButton);
  // }
  onEditClicked() {
    this.showSaveButton = false;
  }
  dropdownList = [];
  selectedItems = [];
  constructor() {}
  ngOnInit(): void {
    this.chargerCategorie();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nom',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.getAllFournisseur();
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelect(item: any) {
    console.log(item);
  }
  onFournisseursSelected() {
    const selectedFournisseurIDs = this.selectedFournisseursByLibs.map(
      (fournisseur) => fournisseur.id
    );
    console.log('IDs des fournisseurs sélectionnés :', selectedFournisseurIDs);
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
    // console.log(this.libCode);
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
    });
  }
  selectFournisseur(fournisseur: any) {
    const nameFournisseurs = document.querySelector(
      '.nameFournisseurs'
    ) as HTMLElement;
    this.selectedFournisseurs.push(fournisseur.id);
    this.selectedFournisseursName.push(fournisseur.nom);
    console.log(this.selectedFournisseurs);
    fournisseur.selected = true;
    nameFournisseurs.innerHTML = this.selectedFournisseursName
      .map((f) => f)
      .join(', ');
    this.searchTerm = this.selectedFournisseursName.map((f) => f).join(', ');
  }
  ajouterOuModifierArticle() {
    if (this.ajout) {
      this.check();
    } else {
      this.modifierArticle();
    }
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
  chargerCategorie() {
    this.categoryservice.getCategories().subscribe((data) => {
      this.categories = data;
      console.log(this.categories);
    });
  }
  libelle = new FormControl('');
  prixArticle = new FormControl('');
  stockArticle = new FormControl('');
  check() {
    this.dataEmitter();
    this.info.emit(this.dataToInsert);
  }
  modifierArticle() {
    this.dataEmitter();
    this.info2.emit(this.dataToInsert);
  }
  dataEmitter() {
    const selectedFournisseurIDs = this.selectedFournisseursByLibs.map(
      (fournisseur) => fournisseur.id
    );
    console.log(this.ref);
    const newLibelle = this.libelle.value;
    const newPrix = this.prixArticle.value;
    const newStock = this.stockArticle.value;
    this.dataToInsert.libelle = newLibelle;
    this.dataToInsert.prix = +newPrix;
    this.dataToInsert.stock = +newStock;
    this.dataToInsert.reference = this.ref;
    this.dataToInsert.fournisseur = selectedFournisseurIDs;
    this.dataToInsert.image = this.imageFile;
    this.dataToInsert.categorie = this.categoryId;
  }
}
