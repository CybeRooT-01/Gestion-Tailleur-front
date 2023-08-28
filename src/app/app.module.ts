import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategorieComponent } from './categorie/categorie.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ArticleComponent } from './article/article.component';
import { FormComponent } from './article/form/form.component';
import { FormComponent as FC } from './article-vente/form/form.component';
import { ListeComponent } from './article/liste/liste.component';
import { ListComponent as Lc } from './article-vente/list/list.component';
import { ItemComponent } from './article/liste/item/item.component';
import { ItemComponent as IV } from './article-vente/list/item/item.component';
import { PaginationComponent } from './article/liste/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ListComponent } from './article-vente/list/list.component';
import { ArticleVenteComponent } from './article-vente/article-vente.component';
@NgModule({
  declarations: [
    AppComponent,
    CategorieComponent,
    ArticleComponent,
    FormComponent,
    FC,
    Lc,
    IV,
    ListeComponent,
    ItemComponent,
    PaginationComponent,
    ListComponent,
    ArticleVenteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
