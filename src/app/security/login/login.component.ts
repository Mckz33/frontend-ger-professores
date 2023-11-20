import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formLogin:FormGroup;

  constructor(private fb:FormBuilder, private toast:ToastrService) {
    this.formLogin = this.acessoLogin()
  }

  ngOnInit(): void {

  }

  public acessoLogin():FormGroup{
    return this.fb.group({
      usuario:["", [Validators.required, Validators.minLength(6)]],
      senha:["", [Validators.required, Validators.minLength(6)]]
    })
  }
  
  public validacaoCaracteres(controlName:string):boolean {
    return !!(this.formLogin.get(controlName)?.invalid && this.formLogin.get(controlName)?.touched)
  }

}

