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

import { CadastroService } from './services/cadastro.service';
import { RegistroComponent } from './pages/registro/registro.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmpAddEditComponent } from './components/forms/emp-add-edit/emp-add-edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { DisAddEditComponent } from './components/forms/dis-add-edit/dis-add-edit.component';
import { CursAddEditComponent } from './components/forms/curs-add-edit/curs-add-edit.component';
import { AdmComponent } from './components/tables/adm/adm.component';
import { RouterModule } from '@angular/router';
import { AdmDisciplinaComponent } from './components/tables/adm-disciplina/adm-disciplina.component';
import { AdmCursoComponent } from './components/tables/adm-curso/adm-curso.component';
import { AdmTrimestreComponent } from './components/tables/adm-trimestre/adm-trimestre.component';
import { ProfViewComponent } from './pages/prof-view/prof-view.component';
import { RegistroCoordenadorComponent } from './pages/registro-coordenador/registro-coordenador.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,

    AdmComponent,
    EmpAddEditComponent,
    DisAddEditComponent,
    CursAddEditComponent,
    AdmDisciplinaComponent,
    AdmCursoComponent,
    AdmTrimestreComponent,
    ProfViewComponent,
    RegistroCoordenadorComponent,
  ],
  imports: [
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
  ],

  providers: [CadastroService],

  bootstrap: [AppComponent, AdmComponent],
})
export class AppModule {}
