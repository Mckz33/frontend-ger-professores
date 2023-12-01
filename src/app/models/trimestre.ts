import { Curso } from './curso';

export interface Trimestre {
  trimestre_id: number;
  descricao: string;
  curso: Curso;
}

