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
import { ViewGestorComponent } from './pages/view-gestor/view-gestor.component';
import { DadosPerfilComponent } from './pages/dados-perfil/dados-perfil.component';
import { ViewCursosComponent } from './pages/view-cursos/view-cursos.component';
import { ModalCadastroCursoComponent } from './components/modal-cadastro-curso/modal-cadastro-curso.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'registro', component: RegistroComponent },

  { path: 'registro/coordenador', component: RegistroCoordenadorComponent, canActivate: [authGuard] },

  { path: 'registro/professor', component: ProfessorCadastroComponent},

  { path: 'cadastro-sucesso', component: CadastroSucessoComponent },
  { path: 'dados-perfil', component: DadosPerfilComponent },


  { path: 'home', component: HomeComponent, canActivate: [authGuard] },


  { path: 'coordenador', component: ViewCoordenadorComponent, canActivate: [authGuard] },
  { path: 'gestor', component: ViewGestorComponent, canActivate: [authGuard] },

  { path: 'cursos', component: ViewCursosComponent},


  // Retorna para a tela de Login caso não ache outra página OU url diferente.
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
