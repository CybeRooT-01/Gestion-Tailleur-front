import { Injectable } from '@angular/core';
import { RestService } from './rest-service.service';
import { RestREsponse } from '../interface/RestResponse';
import { Article } from '../interface/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService extends RestService<RestREsponse<Article>> {

  override uri(): string {
    return 'articles';
  }
}
