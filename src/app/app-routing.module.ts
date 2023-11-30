import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AdmComponent } from './components/tables/adm/adm.component';
import { authGuard } from './guard/auth.guard';
import { AdmDisciplinaComponent } from './components/tables/adm-disciplina/adm-disciplina.component';
import { AdmCursoComponent } from './components/tables/adm-curso/adm-curso.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'home', component: HomeComponent, canActivate: [authGuard] },

  { path: 'registro', component: RegistroComponent },

  { path: 'admin', component: AdmComponent, canActivate: [authGuard] },
  { path: 'admin/disciplina', component: AdmDisciplinaComponent, canActivate: [authGuard] },
  { path: 'admin/curso', component: AdmCursoComponent, canActivate: [authGuard] },

  // Retorna para a tela de Login caso não ache outra página OU url diferente.
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
