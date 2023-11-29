import { Curso } from './curso';

export interface Trimestre {
  id: number;
  descricao: string;
  curso: Curso;
}

