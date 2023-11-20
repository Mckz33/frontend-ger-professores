import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './security/login/login.component';
import { CadastroComponent } from './professor/cadastro/cadastro.component';
const routes: Routes = [
  {
    path: 'home',
    component: LayoutComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'professor/cadastro', component: CadastroComponent },

  // Retorna para a tela Home caso não ache outra página OU url diferente.
  { path: '**', component: LayoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
