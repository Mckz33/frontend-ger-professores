import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './security/login/login.component';
const routes: Routes = [

  {
    path: 'home', component: LayoutComponent,
  },

  {
    path:'login', component: LoginComponent,
  },

  // Retorna para a tela Home caso não ache outra página OU url diferente.
  {path: '**', component: LayoutComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
