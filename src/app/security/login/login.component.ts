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
      senha:['']
    })
  }

  // Método de Login.
  logIn() {
    this._http.get<any>("http://localhost:3000/registro").subscribe(res =>{
      const usuario = res.find((a:any) => {
        return a.email === this.formLogin.value.email && a.senha === this.formLogin.value.senha
      })
      if(usuario) {
        alert("Logado com Sucesso!");
        this.formLogin.reset();
        this.router.navigate(['home'])
      } else {
        alert("Login Inválido.")
      }
    }, err => {
      alert("Login e/ou senha não encontrados.")
    })
  }

}

