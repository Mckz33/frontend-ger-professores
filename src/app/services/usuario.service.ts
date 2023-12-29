import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { AssociacaoService } from './associacao.service';
import { associacao } from '../models/associacao';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  private apiUrl = 'http://localhost:8080/api/usuario';

  constructor(private http: HttpClient, private associacaoService: AssociacaoService) { }

  adicionarProfessor(professor: any): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, professor);
  }

  adicionarUsuario(usuario: any): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario).pipe(
      map(obj => obj),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: any): Observable<any> {
    console.error('Erro na requisição:', error);
    return throwError(error);
  }

  atualizarProfessor(professor: Usuario): Observable<any> {
    return this.http.put(this.apiUrl + '/' + professor.usuarioId, professor);
  }

  deletarProfessor(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  obterProfessor(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id);
  }

  obterProfessorList(): Observable<any> {
    return this.http.get(this.apiUrl+"/usuarios-ativos");
  }

  obterUsuarioPorEmail(email: string): Observable<any> {
    return this.http.get(this.apiUrl+"/por-email/"+email)
  }

  async verificarCargaHorariaExcedida(usuario: Usuario, associassoesList: associacao[]): Promise<boolean> {
    try {
      // Obter todas as associações pendentes para o professor
      const associacoes = associassoesList

      // Filtrar associações para o professor específico
      const associacoesDoProfessor = associacoes.filter(associacao => associacao.usuario.usuarioId === usuario.usuarioId);

      // Calcular a carga horária total das associações pendentes
      const cargaHorariaPendente = associacoesDoProfessor.reduce((total, associacao) => {
        return total + associacao.disciplina.disciplinaCarga;
      }, 0);

      // Verificar se a carga horária total excede o limite
      const cargaHorariaLimite = usuario.professorCarga;
      const cargaHorariaExcedida = cargaHorariaPendente > cargaHorariaLimite;

      return cargaHorariaExcedida;
    } catch (error) {
      console.error('Erro ao verificar carga horária:', error);
      return false;
    }
  }
}
