import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  baseUrl = 'http://localhost:8000/api/categories';
  baseUrlFournisseurs = 'http://127.0.0.1:8000/api/fournisseur';
  baseUrlArticle = 'http://127.0.0.1:8000/api/articles';

  constructor(private _http: HttpClient) {}

  getCategories() {
    return this._http.get(this.baseUrl);
  }
  getFournisseurs() {
    return this._http.get(this.baseUrlFournisseurs);
  }
  addArticle(data: any) {
    return this._http.post(this.baseUrlArticle, data);
  }
}
