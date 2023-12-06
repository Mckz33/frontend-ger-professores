import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidacaoCadastroService } from 'src/app/services/validacao-cadastro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;

  Contratacao: string[] = ['Horista', 'Parcial', 'Integral'];
  tipo: string[] = ['Professor', 'Coordenador', 'Administrador'];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: ValidacaoCadastroService
  ) { }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator })
  }

  private passwordMatchValidator(fg: FormGroup) {
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;
    if (password != confirmPassword) {
      fg.get("confirmPassword")?.setErrors({ passwordMismatch: true });
    } else {
      fg.get('confirmPassword')?.setErrors(null);
    }
  }

  criarUsuario() {
    this.service.signup(this.registroForm.value).subscribe((res) => {
      console.log(res)
      alert('Registro criado com Sucesso!');
      this.registroForm.reset();
      this.router.navigate(['login']);
    },
      (err) => {
        alert('Registro não efetuado!');
      }
    );
  }
}
