import { Curso } from './curso';
import { Usuario } from './usuario';

export interface Disciplina {
  id: string;
  nome: string;
  disciplinaCarga: number;
  curso: Curso;
  usuario: Usuario;
}
