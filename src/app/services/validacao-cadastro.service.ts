// validacao-cadastro.service.ts
import { Injectable } from '@angular/core';
import { Curso } from '../models/curso';
import { Disciplina } from '../models/disciplina';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = ['http://localhost:8080/']

@Injectable({
  providedIn: 'root',
})
export class ValidacaoCadastroService {
  
  constructor(
    private http: HttpClient
  ) { }

  validarCampos(
    nome: string,
    tipoContratacao: string,
    horarioDisponivel: number,
    cursos: Curso[],
    disciplinas: Disciplina[]
  ): boolean {
    if (
      typeof nome === 'string' &&
      nome.trim() !== '' &&
      tipoContratacao &&
      horarioDisponivel !== undefined &&
      !isNaN(Number(horarioDisponivel)) &&
      Number(horarioDisponivel) >= 0 &&
      cursos.length > 0 &&
      disciplinas.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  signup(signupRequest: any): Observable<any> {
    return this.http.post(BASE_URL + "sign-up", signupRequest)
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + "authenticate", loginRequest)
  }

  // hello(): Observable<any> {
  //   const headers = this.createAuthorizationHeader();
    
  //   return this.http.get(BASE_URL + 'FALTANDO', {
  //     headers: headers || undefined 
  //   });
  // }
  

  private createAuthorizationHeader() {
    const jwtToken = localStorage.getItem('JWT');
    if (jwtToken) {
      return new HttpHeaders().set(
        'Authorization', 'Bearer ' + jwtToken
      )
    } else {
      console.log("JWT token not found in the Local Storage");
    }
    return null;
  }

}
