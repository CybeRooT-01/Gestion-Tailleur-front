import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { category } from '../interface/categories';
@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  baseUrl = 'http://localhost:8000/api/categories';
  baseUrlFournisseurs = 'http://127.0.0.1:8000/api/fournisseur';
  baseUrlArticle = 'http://127.0.0.1:8000/api/articles';

  constructor(private _http: HttpClient) {}

  getCategories() {
    return this._http.get<category[]>(this.baseUrl);
  }
  getFournisseurs() {
    return this._http.get(this.baseUrlFournisseurs);
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
  DeleteCategorie(data: any): Observable<any> {
    return this._http.delete(
      'http://127.0.0.1:8000/api/categories/delete',
      data
    );
  }
}
