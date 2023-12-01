import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private apiUrl = 'http://localhost:8080/api/curso'; // Substitua pela sua URL de API

  constructor(private _http: HttpClient) {}

  adicionarCurso(data: any): Observable<any> {
    return this._http.post<any>(this.apiUrl, data);
  }

  atualizarCurso(id: number, data: any): Observable<any> {
    return this._http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  getCursoList(): Observable<any> {
    return this._http.get<any>(this.apiUrl);
  }

  deletarCurso(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/${id}`);
  }

}
