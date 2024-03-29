import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RegistroComponent } from './pages/registro/registro.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { ViewCoordenadorComponent } from './pages/view-coordenador/view-coordenador.component';
import { ProfessorCadastroComponent } from './pages/registro-professor/professor-cadastro.component';
import { CadastroSucessoComponent } from './pages/cadastro-sucesso/cadastro-sucesso.component';
import { ViewGestorComponent } from './pages/view-gestor/view-gestor.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { DadosPerfilComponent } from './pages/dados-perfil/dados-perfil.component';

import { ViewCursosComponent } from './pages/view-cursos/view-cursos.component';
import { ModalCadastroCursoComponent } from './components/modal-cadastro-curso/modal-cadastro-curso.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { ModalCadastroDisciplinaComponent } from './components/modal-cadastro-disciplina/modal-cadastro-disciplina.component';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';
import { ModalEditarCursoComponent } from './components/modal-editar-curso/modal-editar-curso.component';
import { ModalEditarDisciplinaComponent } from './components/modal-editar-disciplina/modal-editar-disciplina.component';
import { RegistroGestorComponent } from './pages/registro-gestor/registro-gestor.component'; 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    ViewCoordenadorComponent,
    CadastroSucessoComponent,
    ViewGestorComponent,
    DadosPerfilComponent,
    ViewCursosComponent,
    ModalCadastroCursoComponent,
    ModalCadastroDisciplinaComponent,
    ModalDeleteComponent,
    ModalEditarCursoComponent,
    ModalEditarDisciplinaComponent,
    RegistroGestorComponent,
  ],
  imports: [
    ProfessorCadastroComponent,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatTabsModule,
    MatCardModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    CdkAccordionModule
  ],

  providers: [],

  bootstrap: [AppComponent],
})
export class AppModule { }
