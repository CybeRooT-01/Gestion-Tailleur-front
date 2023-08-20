import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategorieComponent } from './categorie/categorie.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ArticleComponent } from './article/article.component';
import { FormComponent } from './article/form/form.component';
import { ListeComponent } from './article/liste/liste.component';
import { ItemComponent } from './article/liste/item/item.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [
    AppComponent,
    CategorieComponent,
    ArticleComponent,
    FormComponent,
    ListeComponent,
    ItemComponent,
    PaginationComponent,
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
