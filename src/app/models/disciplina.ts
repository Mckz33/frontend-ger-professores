import { Curso } from "./curso";
import { Usuario } from "./usuario";

export interface Disciplina {
  id: string;
  disciplina_nome: string;
  disciplina_carga: number;
  curso: Curso[] | null;
  usuario: Usuario[];
}
