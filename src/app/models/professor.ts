import { Curso } from './curso';
import { Disciplina } from './disciplina';

export interface Professor {
  id: string;
  nome: string;
  email: string;
  disciplina: Disciplina;
  curso: Curso;
  tipoContratacao: string;
  horarioDisponivel: number;
}
