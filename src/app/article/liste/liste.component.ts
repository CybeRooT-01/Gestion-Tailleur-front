import { Component,Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interface/articles';
import { CategorieService } from '../../services/categorie.service';


@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css'],
})
export class ListeComponent implements OnInit {
  ngOnInit(): void {
  }
  constructor() { }
  

}
