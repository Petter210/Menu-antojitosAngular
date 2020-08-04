import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// categorias
import { CategoriaAntojitosComponent } from './components/categoria-antojitos/categoria-antojitos.component';
// platillos
import { PlatillosCategoriaComponent } from './components/platillos-categoria/platillos-categoria.component';



const routes: Routes = [
  {path: 'categoria-antojitos', component: CategoriaAntojitosComponent},
  {path: 'gestion-platillos/:id', component: PlatillosCategoriaComponent},
  {path: '**', pathMatch: 'full', redirectTo: ' '}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
