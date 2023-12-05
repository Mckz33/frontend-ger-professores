import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { authGuard } from './guard/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { RegistroCoordenadorComponent } from './pages/registro-coordenador/registro-coordenador.component';
import { ViewCoordenadorComponent } from './pages/view-coordenador/view-coordenador.component';
import { ProfessorCadastroComponent } from './pages/professor-cadastro/professor-cadastro.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'registro', component: RegistroComponent },

  { path: 'registro/coordenador', component: RegistroCoordenadorComponent },

  { path: 'registro/professor', component: ProfessorCadastroComponent },

  { path: 'home', component: HomeComponent },

  { path: 'coordenador', component: ViewCoordenadorComponent },

  // Retorna para a tela de Login caso não ache outra página OU url diferente.
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
