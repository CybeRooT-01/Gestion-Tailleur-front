import { Component, Input } from '@angular/core';
import { category } from 'src/app/interface/categories';
import { Article } from '../../interface/articles';

@Component({
  selector: 'app-list-vente',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  @Input() ArticleVente: any;
}
