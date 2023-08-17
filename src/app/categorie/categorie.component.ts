import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategorieService } from '../services/categorie.service';
import { category } from '../interface/categories';
@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
})
export class CategorieComponent implements OnInit, OnDestroy {
  ajout: boolean = false;
  edit: boolean = true;
  categories:category[]= [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: number[] = [3, 6, 9, 12];
  loading: boolean = false;
  categoriesIds: number[] = [];
  libelle: string = '';
  categoryId: number = 0;
  selectedIds: number[] = [];
  checkAllValue = false;
  categorieNames: string[] = [];
  state: boolean = false;
  last:string='';
  constructor(private categorieservice: CategorieService) {}

  ngOnInit(): void {
    this.getCategorie();
  }

  changeMode() {
    this.ajout = !this.ajout;
    this.edit = !this.edit;
    let todisable = document.querySelector('.todisable') as HTMLButtonElement;
    if (this.ajout) {
      todisable.disabled = false;
    } else {
      todisable.disabled = true;
    }
    console.log(this.ajout);
  }
  getCategorie() {
    this.loading = true;
    return this.categorieservice.getCategories().subscribe(
      (res) => {
        this.categories = res;
        this.categories.reverse()
        console.log(this.categories);

        this.categorieNames = this.categories.map(
          (categorie) => categorie.libelle
        );
        this.loading = false;
        this.categoriesIds = this.categories.map((categorie) => categorie.id);

        console.log(this.categoriesIds);
      },
      (err) => console.log(err)
    );
  }
  checkName(name: string) {
    let todisable = document.querySelector('.todisable') as HTMLButtonElement;
    let input = document.querySelector('.input') as HTMLInputElement;
    if (input.value.length < 3) {
      todisable.disabled = true;
    }
    
    if (!this.ajout) {
      this.state = this.categorieNames.find((n) => n == name) != null;
      if (!this.state) {
        todisable.disabled = false;
      } else {
        todisable.disabled = true
      }
    } else {
      todisable.disabled = false;
    }

    console.log(this.state);
  }
  onTableDataChange(event) {
    this.page = event;
    this.getCategorie();
  }
  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getCategorie();
  }
  onLabelClick(categoryName: string, id: number) {
    let todisable = document.querySelector('.todisable') as HTMLButtonElement;
    todisable.disabled = true;
    console.log('Label cliqué pour la catégorie:', categoryName + ' ' + id);
    if (this.ajout == true) {
      return;
    }
    let input = document.querySelector('.input') as HTMLInputElement;
    input.readOnly = false;
    this.libelle = categoryName;
    this.categoryId = id;
  }
  ajouterOuModifierCategorie() {
    if (this.ajout) {
      this.ajouterCategorie();
    } else {
      this.modifierCategorie();
    }
  }
  ajouterCategorie() {
    const data = {
      libelle: this.libelle,
    };

    this.categorieservice.PostCategorie(data).subscribe(
      (res) => {
        console.log(res);
        this.getCategorie();
      },
      (error) => {
        console.error(
          "Erreur lors de l'ajout de la catégorie :",
          error.message
        );
      }
    );
  }
  modifierCategorie() {
    const data = {
      libelle: this.libelle,
    };
    this.categorieservice
      .PutCategrorie(data, this.categoryId)
      .subscribe((res) => {
        let elem = document.getElementById(this.categoryId.toString());
        elem.innerHTML = this.libelle;
        console.log(res.message);
        
      });
  }
  onItemCheckboxChange(id: number) {
    let deleteBtn = document.querySelector(
      '#btnSupprimer'
    ) as HTMLButtonElement;
    if (this.selectedIds.includes(id)) {
      this.selectedIds = this.selectedIds.filter((item) => item !== id);
    } else {
      this.selectedIds.push(id);
    }
    if (this.selectedIds.length > 0) {
      deleteBtn.disabled = false;
    } else {
      deleteBtn.disabled = true;
    }
  }
  supprimerCategorie() {
    const data = {
      ids: this.selectedIds,
    };
    console.log(data);
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    };
    this.categorieservice.DeleteCategorie(options).subscribe((res) => {
      console.log(res);
        this.getCategorie();
    });
  }
  checkall(e: Event) {
    let deleteBtn = document.querySelector(
      '#btnSupprimer'
    ) as HTMLButtonElement;
    if ((e.target as HTMLInputElement).checked) {
      this.selectedIds = this.categories.map((c) => {
        return c.id;
      });
    } else {
      this.selectedIds = [];
    }
    if (this.selectedIds.length > 0) {
      deleteBtn.disabled = false;
    } else {
      deleteBtn.disabled = true;
    }
  }
  ngOnDestroy(): void {
    this.getCategorie().unsubscribe();
    
  }
}
