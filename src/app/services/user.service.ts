import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/usuario';

  constructor(private http: HttpClient) { }

  adicionarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  obterUsuarioPorEmail(email: string): Promise<Usuario | null> {
    const url = `${this.apiUrl}/por-email/${encodeURIComponent(email)}`;

    const delay = 3000;
    const requestPromise = new Promise<Usuario | null>((resolve, reject) => {
      setTimeout(() => {
        this.http.get<Usuario | null>(url)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              console.error('Erro ao obter usuário por e-mail', error);
              reject('Erro ao obter usuário por e-mail');
              throw 'Erro ao obter usuário por e-mail';
            })
          )
          .toPromise()
          .then(response => resolve(response || null));
      }, delay);
    });

    return requestPromise;
  }

  associarProfessor(usuarioId: number, id: number): Observable<any> {
    const url = `${this.apiUrl}/${usuarioId}/login/${id}`;
    return this.http.put(url, null);
  }
}
