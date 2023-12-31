import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { category } from '../interface/categories';
import { Fournisseur } from '../interface/Fournisseurs';
import { Articles } from '../interface/Article';
import { RestService } from './rest-service.service';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  baseUrl = 'http://localhost:8000/api/categories';
  baseUrlFournisseurs = 'http://127.0.0.1:8000/api/fournisseur';
  baseUrlArticle = 'http://127.0.0.1:8000/api/articles';
  baseUrlAll = 'http://127.0.0.1:8000/api/articleFournisseurCategorie';
  urlDelete = 'http://127.0.0.1:8000/api/articles/';
  urlCatConf = 'http://127.0.0.1:8000/api/categoriesConf';

  constructor(private _http: HttpClient) {}
  getCategories() {
    return this._http.get<category[]>(this.baseUrl);
  }

  getCategoriesConf() {
    return this._http.get<category[]>(this.urlCatConf);
  }
  getFournisseurs() {
    return this._http.get<Fournisseur[]>(this.baseUrlFournisseurs);
  }
  addArticle(data: any) {
    return this._http.post(this.baseUrlArticle, data);
  }
  PostCategorie(data: any): Observable<any> {
    return this._http.post('http://127.0.0.1:8000/api/categories', data);
  }
  PutCategrorie(data: any, id: number): Observable<any> {
    return this._http.put(`http://127.0.0.1:8000/api/categories/${id}`, data);
  }
  PutArticle(data: any, id: number): Observable<any> {
    return this._http.put(`http://127.0.0.1:8000/api/article/${id}`, data);
  }
  DeleteCategorie(data: any): Observable<any> {
    return this._http.delete(
      'http://127.0.0.1:8000/api/categories/delete',
      data
    );
  }
  getArticleFournisseurCategorie() {
    return this._http.get<Articles[]>(this.baseUrlAll);
  }
  deleteArticle(id: number) {
    return this._http.delete(`${this.urlDelete}${id}`);
  }
}
