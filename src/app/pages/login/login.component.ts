import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!:FormGroup;

  constructor(private fb:FormBuilder, private _http:HttpClient, private router:Router) {

  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email:[''],
      password:['']
    })
  }

  // Método de Login.
  logIn() {
    this._http.get<any>("http://localhost:3000/usuarios").subscribe(res =>{
      const usuario = res.find((a:any) => {
        return a.email === this.formLogin.value.email && a.password === this.formLogin.value.password
      })
      if(usuario) {
        localStorage.setItem('token', Math.random().toString());
        
        if (usuario.tipo === 'Administrador') {
          alert("Administrador logado com sucesso!");
          this.router.navigate(['home']);
          this.formLogin.reset();
        
        } if (usuario.tipo === 'Coordenador') {
          alert("Coordenador logado com sucesso!");
          this.router.navigate(['home']);
          this.formLogin.reset();

        } else {
          alert("Professor logado com sucesso!");
          this.router.navigate(['home/professor']);
          this.formLogin.reset();
        }

      } else {
        alert("Login Inválido.")
      }
    }, err => {
      alert("Login e/ou senha não encontrados.")
    })
  }

}