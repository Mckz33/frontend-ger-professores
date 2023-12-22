import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Disciplina } from '../models/disciplina';

@Injectable({
  providedIn: 'root',
})
export class DisciplinaService {
  constructor(private _http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api/disciplina';

  adicionarDisciplina(data: Disciplina): Observable<any> {
    return this._http.post(this.apiUrl, data);
  }

  atualizarDisciplina(id: string, data: Disciplina): Observable<any> {
    return this._http.put<Disciplina>(`${this.apiUrl}/${id}`, data);
  }

  getDisciplinaList(): Observable<any> {
    return this._http.get<Disciplina[]>(this.apiUrl+"/disciplinas-ativos");
  }

  deletarDisciplina(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/${id}`);
  }

  getDisciplina(id: number): Observable<any> {
    return this._http.get<Disciplina>(`${this.apiUrl}/${id}`);
  }

  atualizarProfessorDisciplina(disciplinaId: number, professorId: number): Observable<any> {
    return this._http.put(`${this.apiUrl}/${disciplinaId}/professor/${professorId}`, "")
  }
}
