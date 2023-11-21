// cadastro.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso';
import { Disciplina } from '../models/disciplina';
import { ValidacaoCadastroService } from './validacao-cadastro.service';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  constructor(
    private http: HttpClient,
    private validacaoCadastroService: ValidacaoCadastroService
  ) {}

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>('http://localhost:3000/cursos');
  }

  getDisciplinas(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>('http://localhost:3000/disciplinas');
  }

  cadastrarProfessor(
    nome: string,
    tipoContratacao: string,
    horarioDisponivel: number,
    cursos: Curso[],
    disciplinas: Disciplina[]
  ): void {
    const isValid = this.validacaoCadastroService.validarCampos(
      nome,
      tipoContratacao,
      horarioDisponivel,
      cursos,
      disciplinas
    );

    if (isValid) {
      // Lógica para cadastrar o professor
      console.log('Professor cadastrado com sucesso!');
      alert('Foi cadastrado com sucesso!');
    } else {
      console.log('Erro: Por favor, preencha todos os campos corretamente.');
      alert('Erro: Por favor, preencha todos os campos corretamente.');
    }
  }
}
