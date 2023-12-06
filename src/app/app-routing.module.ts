import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { authGuard } from './guard/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { RegistroCoordenadorComponent } from './pages/registro-coordenador/registro-coordenador.component';
import { ViewCoordenadorComponent } from './pages/view-coordenador/view-coordenador.component';
import { ProfessorCadastroComponent } from './pages/registro-professor/professor-cadastro.component';
import { CadastroSucessoComponent } from './pages/cadastro-sucesso/cadastro-sucesso.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},

  { path: 'registro', component: RegistroComponent},

  { path: 'registro/coordenador', component: RegistroCoordenadorComponent, canActivate: [authGuard]},

  { path: 'registro/professor', component: ProfessorCadastroComponent},
  { path: 'cadastro-sucesso', component: CadastroSucessoComponent },

  { path: 'home', component: HomeComponent, canActivate: [authGuard]},

  { path: 'coordenador', component: ViewCoordenadorComponent, canActivate: [authGuard]},

  // Retorna para a tela de Login caso não ache outra página OU url diferente.
  { path: '', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
