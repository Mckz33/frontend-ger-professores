// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class loginService {
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, senha: string): Observable<any> {
    return this.http.get<any>('http://localhost:3000/registro');
  }

  authenticateUser(email: string, senha: string): void {
    this.login(email, senha).subscribe(
      (res) => {
        const usuario = res.find(
          (a: any) => a.email === email && a.senha === senha
        );
        if (usuario) {
          localStorage.setItem('token', Math.random().toString());
          alert('Logado com Sucesso!');
          this.router.navigate(['home']);
        } else {
          alert('Login Inválido.');
        }
      },
      (err) => {
        alert('Login e/ou senha não encontrados.');
      }
    );
  }
}
