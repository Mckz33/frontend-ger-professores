import { Disciplina } from "./disciplina";
import { Trimestre } from "./trimestre";
import { Usuario } from "./usuario";

export interface Curso {
  curso_id: number;
  curso_nome: string;
  trimestre: Trimestre;
  coordenador: Usuario;
  disciplina: Disciplina[];
}
