import { Disciplina } from './disciplina';

export interface Usuario {
  id: number;
  password: string;
  name: string;
  cpf: string;
  email: string;
  professorCarga: number;
  disciplinas: Disciplina[];
  contratacao: string;
  tipo: string;
}