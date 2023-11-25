import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './professor/cadastro/cadastro.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './security/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClientModule } from '@angular/common/http';

import { CadastroService } from './services/cadastro.service';
import { RegistroComponent } from './security/registro/registro.component';

import { MatTableModule } from '@angular/material/table';
<<<<<<< HEAD
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NavbarComponent } from './components/navbar/navbar.component';
=======
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
>>>>>>> upstream/Teste

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    LayoutComponent,
    LoginComponent,
    RegistroComponent,
<<<<<<< HEAD
    NavbarComponent,
=======
>>>>>>> upstream/Teste
  ],
  imports: [
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
<<<<<<< HEAD
    MatSortModule,
=======
    MatSortModule
>>>>>>> upstream/Teste
  ],

  providers: [CadastroService],

  bootstrap: [AppComponent],
})
export class AppModule {}
