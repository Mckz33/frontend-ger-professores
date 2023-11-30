import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;

  Contratacao: string[] = ['Horista', 'Parcial', 'Integral'];
  tipo: string[] = ['Professor', 'Coordenador', 'Administrador'];


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      nome: [''],
      cpf: [''],
      email: [''],
      password: [''],
      professorCarga: null as unknown as number,
      disciplinas: [''],
      Contratacao: [''],
      tipo: [''],
    });
  }

  // Método de criação do usuário.
  criarUsuario() {
    this.http
      .post<any>('http://localhost:3000/usuarios', this.registroForm.value)
      .subscribe(
        (res) => {
          alert('Registro criado com Sucesso!');
          this.registroForm.reset();
          this.router.navigate(['login']);
        },
        (err) => {
          alert('Registro não efetuado!');
        }
      );
  }
}
