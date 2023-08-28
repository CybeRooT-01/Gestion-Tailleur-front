import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { category } from 'src/app/interface/categories';
import { ArticleVenteValidator } from 'src/app/validators/articleVenteValidator';
import { Article } from 'src/app/interface/articles';

@Component({
  selector: 'app-form-vente',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnChanges {
  @Output() articleVente = new EventEmitter();
  formArticleVente: FormGroup;
  showInput: boolean = false;
  edit: boolean = false;
  ajout: boolean = true;
  ref: string = 'REF-';
  @Input() Categories: category[] = [];
  categoriName: string = '';
  num: number = 1;
  @Input() articles: Article[] = [];

  constructor(private fb: FormBuilder) {
    this.formArticleVente = this.fb.group({
      libelle: new FormControl('', [Validators.required]),
      promo: new FormControl(0),
      categorie: new FormControl(''),
      marge: new FormControl(0),
      reference: new FormControl(''),
      image: new FormControl(''),
      cout_fabrication: new FormControl(0),
      prix_vente: new FormControl(0),
      article: this.fb.array([this.createArticleFormGroup()], {
        validators: [ArticleVenteValidator.validArticleArrayItems],
      }),
    });
  }
  createArticleFormGroup(): FormGroup {
    return this.fb.group({
      libelle: [''],
      quantite: [''],
      id: ['']
    });
  }
  coutFabrication: number = 0;
  calculCoutFabrication(event: Event, index: number) {
    let valueInput = (event.target as HTMLInputElement).value;
    const articlesArray = this.formArticleVente.get('article') as FormArray;
    const articleFormGroup = articlesArray.at(index) as FormGroup;
    let libelle = articleFormGroup.get('libelle')?.value;

    let articleConcerner = this.articles.find((article) => {
      return article.libelle == libelle;
    });
    articleFormGroup.get('id')?.setValue(articleConcerner?.id);
    let stockPourCeLibelle = articleConcerner?.stock;
    let prixPourCeLibelle = articleConcerner?.prix;
    let quantite = Number(valueInput);
    let prix = quantite * prixPourCeLibelle;
    this.coutFabrication += prix;
    articleFormGroup.get('quantite')?.setValue(quantite);
    if (stockPourCeLibelle && quantite > stockPourCeLibelle) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Vous avez dépassé le stock',
      });
      articleFormGroup.get('quantite')?.setValue(0);
    }
    this.formArticleVente.patchValue({ cout_fabrication: this.coutFabrication });
  }
  prixDeVente: number = 0;
  calculPrixVente(event: Event) {
    let valueInput = (event.target as HTMLInputElement).value;
    this.prixDeVente = this.coutFabrication + Number(valueInput);
    this.formArticleVente.patchValue({ prix_vente: this.prixDeVente });
    
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.articles);
  }
  filteredArticles: Article[][] = [];
  filterArticle(event: Event, index: number) {
    let valueInput = (event.target as HTMLInputElement).value;
    let articles = this.articles.filter((article) => {
      return article.libelle.includes(valueInput);
    });
    this.filteredArticles[index] = articles;
  }
  searchTerms: string[] = [];
  setSearchTerm(value: string, index: number) {
    this.searchTerms[index] = value;
    this.filteredArticles = [];
    const articlesArray = this.formArticleVente.get('article') as FormArray;
    const articleFormGroup = articlesArray.at(index) as FormGroup;
    articleFormGroup.get('libelle')?.setValue(value);
  }

  getCategory(event: any) {
    let value = event.target.value;
    this.Categories.find((categorie) => {
      if (categorie.id == value) {
        this.categoriName = categorie.libelle;
      }
    });
  }

  validate(event: any) {
    let value = event.target.value;
    let newValue = value.replace(/[^0-9]/g, '');
    if (value !== newValue) {
      event.target.value = newValue;
    }
  }
  ngOnInit(): void {
    this.convertValue();
  }
  toggleInput() {
    this.showInput = !this.showInput;
  }
  changeMode() {
    this.ajout = !this.ajout;
    this.edit = !this.edit;
  }
  updateref(event: any) {
    const libCode = this.formArticleVente.get('libelle')?.value.substring(0, 3);
    let ref = 'REF-' + libCode.toUpperCase();
    ref += '-' + this.categoriName.toUpperCase();
    ref += '-' + this.num;
    this.formArticleVente.patchValue({ reference: ref });
  }
  convertValue() {
    let valueCategorie = this.formArticleVente.get('categorie')?.value;
    this.formArticleVente.get('categorie')?.setValue(Number(valueCategorie));
    let valuePromo = this.formArticleVente.get('promo')?.value;
    this.formArticleVente.get('promo')?.setValue(Number(valuePromo));
    let valueMarge = this.formArticleVente.get('marge')?.value;
    this.formArticleVente.get('marge')?.setValue(Number(valueMarge));
  }

  ajouterOuModifierArticle() {
    if (this.ajout) {
      this.ajouterArticleVente();
    } else {
      this.modifierArticle();
    }
  }
  ajouterArticleVente() {
    this.convertValue();
    this.articleVente.emit(this.formArticleVente.value);
  }
  modifierArticle() {
    console.log('update');
  }

  get articleControl() {
    return this.formArticleVente.get('article') as FormArray;
  }

  ajouterArticle() {
    const articles = this.formArticleVente.get('article') as FormArray;
    articles.push(this.createArticleFormGroup());
    console.log(this.formArticleVente.value);
  }

  imageFile: any = '';
  extensionsAutorised = ['jpg', 'jpeg', 'png', 'jfif'];
  extension: string = '';
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
      this.formArticleVente.patchValue({ image: this.imageFile });
    };
    reader.readAsDataURL(this.imageFile);
  }
}
