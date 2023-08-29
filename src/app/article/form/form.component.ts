import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CategorieService } from '../../services/categorie.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Fournisseur } from 'src/app/interface/Fournisseurs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categorie } from '../../interface/Article';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnChanges {
  categories: any;
  imageFile: any = '';
  categoryId: number;
  num: number = 1;
  selectedFournisseurs: number[] = [];
  fournisseurs: any[] = [];
  filteredFournisseurs: Fournisseur[] = [];
  selectedFournisseursName: string[] = [];
  ref: string = 'REF-';
  extension: string = '';
  extensionsAutorised = ['jpg', 'jpeg', 'png', 'jfif'];
  ajout: boolean = true;
  edit: boolean = false;
  isAllSelected = false;
  @Input() article: any;
  showFournisseursDiv = false;
  @Input() categoryservice: CategorieService;
  @Output() info = new EventEmitter();
  @Output() info2 = new EventEmitter();
  fournisseurdivHidden = true;
  toggleFournisseursDiv() {
    this.showFournisseursDiv = !this.showFournisseursDiv;
    console.log(this.showFournisseursDiv);
  }
  showSaveButton = true;
  changeMode() {
    this.ajout = !this.ajout;
    this.edit = !this.edit;
    const editButton = document.querySelectorAll('.editButton');
    if (this.edit) {
      editButton.forEach((btn: HTMLButtonElement) => {
        btn.disabled = false;
      });
    } else {
      editButton.forEach((btn: HTMLButtonElement) => {
        btn.disabled = true;
      });
    }
  }
  search(event: any) {
    let value = event.target.value;
    this.filteredFournisseurs = this.fournisseurs.filter((fournisseur) =>
      fournisseur.nom.toLowerCase().includes(value.toLowerCase())
    );
    console.log(this.filteredFournisseurs);
  }
  onEditClicked() {
    this.showSaveButton = false;
  }
  constructor() {}
  ngOnChanges(_changes: SimpleChanges): void {
    this.loadArticle();
  }
  ngOnInit(): void {
    this.loadArticle();
    this.chargerCategorie();
    this.getAllFournisseur();
  }

  checkall(e: Event) {
    const target = e.target as HTMLInputElement;
    let tocheck = document.querySelectorAll('.tocheck');
    if (target.checked) {
      tocheck.forEach((check: HTMLInputElement) => {
        check.checked = true;
        this.selectedFournisseurs.push(+check.id);
      });
      console.log(this.selectedFournisseurs);
    } else {
      tocheck.forEach((check: HTMLInputElement) => {
        check.checked = false;
        this.selectedFournisseurs = [];
      });
      console.log(this.selectedFournisseurs);
    }
  }

  onItemSelect(item: any) {
    let toInsertName = document.querySelector('.toInsertName') as HTMLElement;
    let btnToChekAll = document.getElementById('selectAll') as HTMLInputElement;
    if (item.target.checked) {
      let span = `<span class="bg-primary text-light" style="border-radius: 7px; margin:4px; padding:3px">${item.target.name}</span>`;

      toInsertName.innerHTML += span;
      console.log(item.target.name);

      this.selectedFournisseurs.push(+item.target.id);
      this.ArticleForm.patchValue({ fournisseur: this.selectedFournisseurs });
      console.log(this.selectedFournisseurs);
    } else {
      let spans = document.querySelectorAll('.toInsertName span');
      spans.forEach((span: HTMLElement) => {
        if (span.innerHTML === item.target.name) {
          span.remove();
        }
      });
      this.selectedFournisseurs = this.selectedFournisseurs.filter(
        (id) => id !== +item.target.id
      );
      console.log(this.selectedFournisseurs);
    }
    if (this.selectedFournisseurs.length === this.fournisseurs.length) {
      btnToChekAll.checked = true;
    } else {
      btnToChekAll.checked = false;
    }
  }
  updateSelectAll() {
    const selectedFournisseursIDs = this.fournisseurs
      .filter((fournisseur) => fournisseur.selected)
      .map((fournisseur) => fournisseur.id);
    this.isAllSelected =
      selectedFournisseursIDs.length === this.fournisseurs.length;
  }

  onFileChange(event: any) {
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
      this.ArticleForm.patchValue({ image: this.imageFile });
    };
    reader.readAsDataURL(this.imageFile);
  }
  getAllFournisseur() {
    this.categoryservice.getFournisseurs().subscribe((data) => {
      this.fournisseurs = data;
    });
  }

  ajouterOuModifierArticle() {
    if (this.ajout) {
      this.check();
    } else {
      this.modifierArticle();
    }
  }

  onInputChange() {
    this.selectedFournisseurs = [];
  }

  loadArticle() {
    this.selectedFournisseurs = [];
    let toInsertName = document.querySelector('.toInsertName') as HTMLElement;
    toInsertName.innerHTML = '';
    const loadedArticle = this.article;
    let categorie = loadedArticle?.categorie.libelle;
    this.ArticleForm.patchValue({ libelle: loadedArticle?.libelle });
    this.ArticleForm.patchValue({ prix: loadedArticle?.prix });
    this.ArticleForm.patchValue({ stock: loadedArticle?.stock });
    this.ArticleForm.patchValue({ image: loadedArticle?.image });
    this.ArticleForm.patchValue({ reference: loadedArticle?.reference });
    this.ArticleForm.patchValue({
      categorie: loadedArticle?.categorie.libelle,
    });
    let fournisseursLoaded = loadedArticle?.fournisseurs;
    fournisseursLoaded?.forEach((element) => {
      this.selectedFournisseurs.push(element.id);
      let span = `<span class="bg-primary text-light" style="border-radius: 7px; margin:4px; padding:3px">${element.nom}</span>`;
      toInsertName.innerHTML += span;
    });
  }

  chargerCategorie() {
    this.categoryservice.getCategoriesConf().subscribe((data) => {
      this.categories = data;
    });
  }

  check() {
    const categorieValue = this.ArticleForm.get('categorie')?.value;
    const selectedCategory = this.categories.find(
      (cat: any) => cat.libelle === categorieValue
    );
    this.categoryId = selectedCategory.id;
    const prixValue = this.ArticleForm.get('prix')?.value;
    const stockValue = this.ArticleForm.get('stock')?.value;
    this.ArticleForm.patchValue({ categorie: +this.categoryId });
    this.ArticleForm.patchValue({ prix: +prixValue });
    this.ArticleForm.patchValue({ stock: +stockValue });
    this.info.emit(this.ArticleForm.value);
  }
  modifierArticle() {
    let fournisseursIds: number[] = [];
    this.selectedFournisseurs.forEach((id) => {
      fournisseursIds.push(id);
    });
    let CategorieName = this.ArticleForm.get('categorie')?.value;
    let CategorieId = this.categories.find(
      (cat: any) => cat.libelle === CategorieName
    ).id;

    this.ArticleForm.patchValue({ fournisseur: fournisseursIds });
    this.ArticleForm.patchValue({ categorie: CategorieId });
    this.info2.emit(this.ArticleForm.value);
    
  }

  validate(event: any) {
    let value = event.target.value;
    let newValue = value.replace(/[^0-9]/g, '');
    if (value !== newValue) {
      event.target.value = newValue;
    }
  }
  categoryname: string = '';
  getCategoryName(event: any) {
    const selectedCategory = event.target.value;
    this.categoryname = selectedCategory;
  }
  ArticleForm = new FormGroup({
    libelle: new FormControl('', Validators.required),
    prix: new FormControl(0, Validators.required),
    stock: new FormControl(0, Validators.required),
    image: new FormControl(''),
    categorie: new FormControl<number>(0, Validators.required),
    fournisseur: new FormControl([]),
    reference: new FormControl(''),
  });
  updateref(event: any) {
    const libCode = this.ArticleForm.get('libelle')?.value.substring(0, 3);
    let ref = 'REF-' + libCode.toUpperCase();
    ref += '-' + this.categoryname.toUpperCase();
    ref += '-' + this.num;
    this.ArticleForm.patchValue({ reference: ref });
  }

  get libelle() {
    return this.ArticleForm.get('libelle');
  }
  get prix() {
    return this.ArticleForm.get('prix');
  }
  get stock() {
    return this.ArticleForm.get('stock');
  }
  get image() {
    return this.ArticleForm.get('image');
  }
  get categorie() {
    return this.ArticleForm.get('categorie');
  }
}
