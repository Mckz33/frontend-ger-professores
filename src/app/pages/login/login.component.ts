import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidacaoCadastroService } from 'src/app/services/validacao-cadastro.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;

  constructor(private fb: FormBuilder, private service: ValidacaoCadastroService, private router: Router) {

  }

  ngOnInit() {
    this.formLogin = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    })
  }

  // Método de Login.
  logIn() {
    this.service.login(this.formLogin.value).subscribe((res) => {
      if (res.jwtToken) {
        alert("Logado com Sucesso!");
        const jwtToken = res.jwtToken;
        localStorage.setItem('token', jwtToken);
        this.router.navigate(['home'])
        this.formLogin.reset();

      } else {
        alert("Login Inválido.")
      }
    }, err => {
      alert("Login e/ou senha não encontrados.")
    })
  }
}