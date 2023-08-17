import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieComponent } from './categorie/categorie.component';
import { ArticleComponent } from './article/article.component';


const routes: Routes = [{ path: 'categories', component: CategorieComponent }, {path:'articles', component:ArticleComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
