import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  private apiUrl = 'http://localhost:8080/api/usuario';

  constructor(private http: HttpClient) { }

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

}
