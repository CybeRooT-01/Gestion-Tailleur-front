import { Component,OnInit,Input,OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-item-vente',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.ArticleVente);
    
  }
  ngOnInit(): void {}
  @Input() ArticleVente: any;
}
