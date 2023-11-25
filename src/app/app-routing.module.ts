import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './security/login/login.component';
import { CadastroComponent } from './components/professor/cadastro/cadastro.component';
import { RegistroComponent } from './security/registro/registro.component';
import { AdmComponent } from './components/adm/adm.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'home', component: LayoutComponent },

  { path: 'professor/cadastro', component: CadastroComponent },

  { path: 'registro', component: RegistroComponent },

  { path: 'admin', component: AdmComponent },

  // Retorna para a tela de Login caso não ache outra página OU url diferente.
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
