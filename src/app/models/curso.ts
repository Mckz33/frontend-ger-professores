import { Disciplina } from './disciplina';
import { Trimestre } from './trimestre';

export interface Curso {
  id: number;
  nome: string;
  trimestre: Trimestre;
  disciplinas: Disciplina;
}
