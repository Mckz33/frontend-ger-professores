import { Disciplina } from "./disciplina"
import { Usuario } from "./usuario"

export interface associacao {
    
    associacaoId: number,
    dataRegistro: Date,
    disciplina: Disciplina,
    usuario: Usuario,
    statusAprovacao: string,
    statusAtivo: String
      
}

