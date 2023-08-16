import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategorieService } from '../services/categorie.service';
@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
})
export class CategorieComponent implements OnInit, OnDestroy {
  ajout: boolean = false;
  edit: boolean = true;
  categories: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: number[] = [3, 6, 9, 12];
  loading: boolean = false;
  categoriesIds: number[] = [];

  constructor(private categorieservice: CategorieService) {}

  ngOnInit(): void {
    this.getCategorie();    
  }
  changeMode() {
    this.ajout = !this.ajout;
    this.edit = !this.edit;
  }

  getCategorie() {
    this.loading = true;
    return this.categorieservice.getCategories().subscribe(
      (res) => {
        this.categories = res;
        this.loading = false
        this.categoriesIds = this.categories.map((categorie: any) => categorie.id);
        console.log(this.categoriesIds);
        
      },
      (err) => console.log(err)
    );

  }
  
  onTableDataChange(event: any) {
    this.page = event;
    this.getCategorie();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getCategorie();
  }
  onLibelleClick() {
    
  }
  ngOnDestroy(): void {
    this.getCategorie().unsubscribe();
  }
}
