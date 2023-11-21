// validacao-cadastro.service.ts
import { Injectable } from '@angular/core';
import { Curso } from '../models/curso';
import { Disciplina } from '../models/disciplina';
@Injectable({
  providedIn: 'root',
})
export class ValidacaoCadastroService {
  constructor() {}

  validarCampos(
    nome: string,
    tipoContratacao: string,
    horarioDisponivel: number,
    cursos: Curso[],
    disciplinas: Disciplina[]
  ): boolean {
    if (
      typeof nome === 'string' &&
      nome.trim() !== '' &&
      tipoContratacao &&
      horarioDisponivel !== undefined &&
      !isNaN(Number(horarioDisponivel)) &&
      Number(horarioDisponivel) >= 0 &&
      cursos.length > 0 &&
      disciplinas.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}
