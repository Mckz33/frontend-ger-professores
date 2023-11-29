import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private apiUrl = 'http://localhost:3000/cursos'; // Substitua pela sua URL de API

  constructor(private _http: HttpClient) {}

  adicionarCurso(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/cursos', data);
  }

  atualizarCurso(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/cursos/${id}`, data);
  }

  getCursoList(): Observable<any> {
    return this._http.get('http://localhost:3000/cursos');
  }

  deletarCurso(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/cursos/${id}`);
  }

}
