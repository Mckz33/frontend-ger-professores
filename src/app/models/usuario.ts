export interface Usuario {
  usuarioId: number;
  usuarioNome: string;
  usuarioCpf: string;
  usuarioEmail: string;
  professorCarga: number;
  tipoContratacao: string; // ou Enum correspondente
  tipoUsuario: string; // ou Enum correspondente
  curEscolhidos: string;
  discEscolhidos: string[];
  statusAtivo: string;
}
