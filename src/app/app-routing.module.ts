import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieComponent } from './categorie/categorie.component';
import { ArticleComponent } from './article/article.component';
import { ArticleVenteComponent } from './article-vente/article-vente.component';

const routes: Routes = [
  { path: 'categories', component: CategorieComponent },
  { path: 'articles', component: ArticleComponent },
  { path: 'article-Vente', component: ArticleVenteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
