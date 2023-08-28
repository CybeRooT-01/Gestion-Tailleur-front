import { Injectable } from '@angular/core';
import { RestREsponse } from '../interface/RestResponse';
import { Article } from '../interface/articles';
import { RestService } from './rest-service.service';

@Injectable({
  providedIn: 'root'
})
export abstract class  ArticleVenteService extends RestService<RestREsponse<Article>> {

  override uri(): string {
    return 'articlesVente';
  }
}
