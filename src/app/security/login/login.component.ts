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

  login() {
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe((response) => {
      console.log(response);
      if (response.jwtToken) {
        alert(response.jwtToken);
        const jwtToken = response.jwtToken;
        localStorage.setItem('JWT', jwtToken);
        this.router.navigateByUrl('/dashboard');
      }
    })
  }
}