import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import notification from 'sweetalert2';
import { RestREsponse } from '../interface/RestResponse';
import { Environnements } from 'src/environements/environnements';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { category } from '../interface/categories';

@Injectable({
  providedIn: 'root',
})
export abstract class RestService<T extends RestREsponse<T>> {
  constructor(public http: HttpClient) {}

  abstract uri(): string;

  All() {
    return this.http.get(Environnements.api.baseUrl + `/${this.uri()}`).pipe(
      tap((response: any): void => {
        console.log(response);
      }),
      catchError(this.handleError)
    );
  }

  create(data: Partial<T>): Observable<T> {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
    };
    return this.http
      .post<T>(Environnements.api.baseUrl + `/${this.uri()}`, data, httpOptions)
      .pipe(
        tap((response: any): void => {
          console.log(response);
          notification.fire({
            title: 'Succès',
            icon: 'success',
            text: 'Données ajoutées avec succès',
          });
        }),
        catchError(this.handleError)
      );
  }

  update(data: Partial<T>): Observable<T> {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
    };

    return this.http
      .put<T>(
        Environnements.api.baseUrl + `/${this.uri()}/${data.id}`,
        data,
        httpOptions
      )
      .pipe(
        tap((response: any): void => {
          console.log(response);
          notification.fire({
            title: 'Succès',
            icon: 'success',
            text: 'Données modifiées avec succès',
          });
        }),
        catchError(this.handleError)
      );
  }

  delete(id: number): Observable<T> {
    return this.http
      .delete<T>(Environnements.api.baseUrl + `/${this.uri()}/${id}`)
      .pipe(
        tap((response: any): void => {
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
  getCategoryVente(): Observable<category[]> {
    return this.http.get<category[]>('http://127.0.0.1:8000/api/categorieVente');
  }
}
