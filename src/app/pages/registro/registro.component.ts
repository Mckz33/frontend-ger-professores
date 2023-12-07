import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-registro-coordenador',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  coordenadorForm: FormGroup;
  cadastroSucesso: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.coordenadorForm = this.fb.group(
      {
        nome: [null, [Validators.required, Validators.minLength(6)]],
        email: [null, [Validators.required, Validators.email]],
        senha: [null, [Validators.required, Validators.minLength(6)]],
        confirmarSenha: [null, [Validators.required]],
      },
      { validator: this.confirmaSenhaValidator }
    );
  }

  confirmaSenhaValidator(group: FormGroup) {
    const senhaControl = group.get('senha');
    const confirmarSenhaControl = group.get('confirmarSenha');

    if (senhaControl && confirmarSenhaControl) {
      const senha = senhaControl.value;
      const confirmarSenha = confirmarSenhaControl.value;

      return senha === confirmarSenha ? null : { senhasNaoCoincidem: true };
    }

    return null;
  }

  temErro(campo: string, erro: string) {
    const control = this.coordenadorForm.get(campo);

    return control ? control.hasError(erro) : false;
  }

  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmaSenha: string = '';

  clearData() {
    this.coordenadorForm.reset();

    this.snackBar.open('Os campos foram limpos.', 'Fechar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
  signup() {
    this.service.adicionarProfessor(this.coordenadorForm.value).subscribe(
      () => {
        this.coordenadorForm.reset();
        this.snackBar.open('Sucesso', 'Fechar', {
          duration: 4000,
        });
        this.cadastroSucesso = true;
      },
      (error) => {
        console.error('Erro ao cadastrar:', error);
      }
    );
  }
}
