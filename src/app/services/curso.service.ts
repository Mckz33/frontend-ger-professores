import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private apiUrl = 'http://localhost:8080/api/curso';

  constructor(private http: HttpClient) { }

  obterCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl+"/cursos-ativos");
  }
  obterCurso(id: string): Observable<Curso> {
    return this.http.get<Curso>(this.apiUrl + '/' + id);
  }
  adicionarCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }
  atualizarCurso(curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${curso.cursoId}`, curso);
  }
  deletarCurso(id: number): Observable<Curso> {
    return this.http.delete<Curso>(this.apiUrl + '/' + id);
  }
  associarCursoDisciplina(cursoId: number, disciplinaId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${cursoId}/adicionarDisciplina/${disciplinaId}`, null);
  }
  
}
