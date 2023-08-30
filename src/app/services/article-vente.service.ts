import { Injectable } from '@angular/core';
import { RestREsponse } from '../interface/RestResponse';
import { Article } from '../interface/articles';
import { RestService } from './rest-service.service';
import { Environnements } from 'src/environements/environnements';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class ArticleVenteService extends RestService<
  RestREsponse<Article>
> {
  override uri(): string {
    return 'articlesVente';
  }
  getAllTailles() {
    return this.http
      .get(Environnements.api.baseUrl + `/${this.uri()}/tailles`)
      .pipe(
        tap((response: any): void => {
        })
      );
  }
}
