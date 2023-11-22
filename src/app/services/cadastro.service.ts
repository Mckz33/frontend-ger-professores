// cadastro.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso';
import { Disciplina } from '../models/disciplina';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  constructor(
    private http: HttpClient,
  ) {}

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>('http://localhost:3000/cursos');
  }

  getDisciplinas(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>('http://localhost:3000/disciplinas');
  }
}
