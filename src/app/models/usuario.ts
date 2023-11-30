import { Disciplina } from './disciplina';

export interface Usuario {
  name: string;
  cpf: string;
  email: string;
  professorCarga: number;
  disciplinas: Disciplina[];
  contratacao: string;
  tipo: string;
}
