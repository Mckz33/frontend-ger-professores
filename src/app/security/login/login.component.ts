import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidacaoCadastroService } from 'src/app/services/validacao-cadastro.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private service: ValidacaoCadastroService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    })
  }

  // Método de Login.
  logIn() {
    this._http.get<any>("http://localhost:3000/registro").subscribe(res =>{
      const usuario = res.find((a:any) => {
        return a.email === this.formLogin.value.email && a.senha === this.formLogin.value.senha
      })
      if(usuario) {
        localStorage.setItem('token', Math.random().toString());
        alert("Logado com Sucesso!");
        this.formLogin.reset();
        this.router.navigate(['home'])
      } else {
        alert("Login Inválido.")
      }
    })
  }
}