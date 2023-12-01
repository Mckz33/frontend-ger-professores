import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidacaoCadastroService } from 'src/app/services/validacao-cadastro.service';
@Component({
  selector: 'app-registro-coordenador',
  templateUrl: './registro-coordenador.component.html',
  styleUrls: ['./registro-coordenador.component.css'],
})
export class RegistroCoordenadorComponent {
  coordenadorForm: FormGroup;
  cadastroSucesso: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: ValidacaoCadastroService,
    private router: Router
  ) {
    this.coordenadorForm = this.fb.group(
      {
        nome: [null, [Validators.required]],
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

  signup() {
    this.service.signup(this.coordenadorForm.value).subscribe(
      () => {
        this.coordenadorForm.reset();
        alert('sucesso');
        this.cadastroSucesso = true;
      },
      (error) => {
        console.error('Erro ao cadastrar:', error);
      }
    );
  }
}
