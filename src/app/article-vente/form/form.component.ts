import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Article } from 'src/app/interface/articles';
import { category } from 'src/app/interface/categories';
import { Tailles } from 'src/app/interface/tailles';
import { ImageService } from 'src/app/services/image.service';
import { ArticleVenteValidator } from 'src/app/validators/articleVenteValidator';
import Swal from 'sweetalert2';

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
  @Input() tailles: Tailles[];
  @Input() articles: Article[] = [];
  @Input() ArticleToEdit: any;
  @Input() ArticleVente: any;
  maxMarge: number = 0;
  constructor(private fb: FormBuilder, private imageService: ImageService) {
    this.formArticleVente = this.fb.group({
      libelle: new FormControl('', [
        Validators.required,
        this.uniqueLibelleValidator.bind(this),
      ]),
      id: new FormControl(),
      promo: new FormControl(0, [Validators.min(0), Validators.max(100)]),
      categorie: new FormControl(''),
      showInput: new FormControl(false),
      marge: new FormControl(0, [Validators.required]),
      reference: new FormControl(''),
      image: new FormControl(''),
      tailles: new FormControl(''),
      cout_fabrication: new FormControl(0),
      prix_vente: new FormControl(0),
      article: this.fb.array([this.createArticleFormGroup()], {
        validators: [ArticleVenteValidator.validArticleArrayItems],
      }),
    });
  }
  uniqueLibelleValidator(control: FormControl): { [key: string]: any } | null {
    if(this.edit) return null;
    const libelle = control.value;
    let AllArticleNames = this.ArticleVente?.map((article) => {
      return article.libelle;
    });
    let isUnique = AllArticleNames?.every((name) => {
      return name !== libelle;
    });
    if (!isUnique) {
      return { uniqueLibelle: true };
    }
    return null;
  }

  get marge() {
    return this.formArticleVente.get('marge');
  }
  get promo() {
    return this.formArticleVente.get('promo');
  }
  get libelle() {
    return this.formArticleVente.get('libelle');
  }
  get categorie() {
    return this.formArticleVente.get('categorie');
  }
  createArticleFormGroup(): FormGroup {
    return this.fb.group({
      libelle: ['', [Validators.required]],
      quantite: ['', [Validators.required, this.onlyNumbersValidator]],
      id: [''],
    });
  }
  onlyNumbersValidator(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
    if (value && !/^\d+$/.test(value)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La quantité doit contenir uniquement des chiffres.',
      });
      return { onlyNumbers: true };
    }
    return null;
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
    this.formArticleVente.patchValue({
      cout_fabrication: this.coutFabrication,
    });
  }

  prixDeVente: number = 0;
  calculPrixVente(event: Event) {
    this.maxMarge = this.coutFabrication / 3;
    let valueInput = (event.target as HTMLInputElement).value;
    if (Number(valueInput) > this.maxMarge) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `vous ne pouvez pas mettre une marge supérieur à ${this.maxMarge}`,
      });
      this.formArticleVente.get('marge').setErrors({ invalidMarge: true });
      return;
    }
    this.prixDeVente = this.coutFabrication + Number(valueInput);
    this.formArticleVente.patchValue({ prix_vente: this.prixDeVente });
  }

  ngOnChanges(changes: SimpleChanges) {
    const articles = this.ArticleToEdit?.articles;
    if (this.ArticleToEdit !== undefined) {
      this.formArticleVente.setControl('article', this.fb.array([]));

      articles?.forEach((article) => {
        const group = this.fb.group({
          libelle: [article.libelle],
          quantite: [article.quantite],
          id: [article.id],
        });
        (<FormArray>this.formArticleVente.get('article')).push(group);
      });
      this.formArticleVente.patchValue({
        libelle: this.ArticleToEdit?.libelle,
      });
      this.formArticleVente.patchValue({
        categorie: this.ArticleToEdit?.categorie.id,
      });
      this.formArticleVente.patchValue({ promo: this.ArticleToEdit?.promo });
      this.formArticleVente.patchValue({ marge: this.ArticleToEdit?.marge });
      this.formArticleVente.patchValue({
        reference: this.ArticleToEdit?.reference,
      });
      this.formArticleVente.patchValue({ image: this.ArticleToEdit?.image });
      this.formArticleVente.patchValue({
        cout_fabrication: this.ArticleToEdit?.cout_fabrication,
      });
      this.formArticleVente.patchValue({
        prix_vente: this.ArticleToEdit?.prix_vente,
      });
      this.formArticleVente.patchValue({ id: this.ArticleToEdit?.id });
      this.formArticleVente.patchValue({
        tailles: this.ArticleToEdit?.tailles,
      });
      // console.log(this.tailles);

      // console.log(this.formArticleVente.value.tailles);
      if (this.ArticleToEdit?.promo !== null) {
        this.showInput = true;
      }
    }
  }
  filteredArticles: Article[][] = [];
  filterArticle(event: Event, index: number) {
    let valueInput = (event.target as HTMLInputElement).value;
    let articles = this.articles.filter((article) => {
      return article.libelle.includes(valueInput);
    });
    this.filteredArticles[index] = articles;
    if (articles.length == 0) {
      const articlesArray = this.formArticleVente.get('article') as FormArray;
      const articleFormGroup = articlesArray.at(index) as FormGroup;
      articleFormGroup.get('quantite')?.disable();
    } else {
      const articlesArray = this.formArticleVente.get('article') as FormArray;
      const articleFormGroup = articlesArray.at(index) as FormGroup;
      articleFormGroup.get('quantite')?.enable();
    }
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
    if (!this.showInput) {
      this.formArticleVente.get('promo').setValue(0); // Réinitialisez la valeur si nécessaire
    }
  }
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
    let TailleValue = this.formArticleVente.get('taille')?.value;
    this.formArticleVente.get('taille')?.setValue(Number(TailleValue));
    if (this.formArticleVente.get('promo')?.value == 0) {
      this.formArticleVente.get('promo')?.setValue(null);
    }
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
    console.log(this.formArticleVente.value);

    this.articleVente.emit(this.formArticleVente.value);
  }
  @Output() articleVenteToSend = new EventEmitter();
  modifierArticle() {
    this.convertValue();
    this.articleVenteToSend.emit(this.formArticleVente.value);
    console.log(this.formArticleVente.value);
  }

  get articleControl() {
    return this.formArticleVente.get('article') as FormArray;
  }

  ajouterArticle() {
    const articles = this.formArticleVente.get('article') as FormArray;
    if (!articles.at(articles.length - 1).valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Vous devez remplir le champ précédent',
      });
      return;
    }

    articles.push(this.createArticleFormGroup());
  }

  imageFile: any;
  async onFileChange(event: any) {
    const file = event.target.files[0];

    try {
      this.imageFile = await this.imageService.uploadImageAndGetBase64(file);
      this.formArticleVente.patchValue({ image: this.imageFile });
      console.log(this.formArticleVente.value);
    } catch (error) {
      console.error(error);
    }
  }
}
