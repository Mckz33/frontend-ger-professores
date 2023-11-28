import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DisciplinaService {
  constructor(private _http: HttpClient) {}

  adicionarDisciplina(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/disciplinas', data);
  }

  atualizarDisciplina(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/disciplinas/${id}`, data);
  }

  getDisciplinaList(): Observable<any> {
    return this._http.get('http://localhost:3000/disciplinas');
  }

  deletarDisciplina(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/disciplinas/${id}`);
  }
}
