import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { associacao } from '../models/associacao';

@Injectable({
  providedIn: 'root'
})
export class AssociacaoService {

  private apiUrl = 'http://localhost:8080/api/associacoes';

  constructor(private http: HttpClient) { }

  obterAssociacoesPendentes(): Observable<associacao[]> {
    return this.http.get<associacao[]>(`${this.apiUrl}/pendentes`)
  }

  aprovarAssociacao(associacaoId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/aprovar/${associacaoId}`, null)
  }

  negarAssociacao(associacaoId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/reprovar/${associacaoId}`, null)
  }

  criarAssociacao(associacao: associacao): Observable<any> {
    return this.http.post(`${this.apiUrl}`, associacao)
  }
}
