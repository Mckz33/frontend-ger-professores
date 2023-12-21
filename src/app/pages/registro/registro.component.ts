import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidacaoCadastroService } from 'src/app/services/validacao-cadastro.service';
import { Usuario } from 'src/app/models/usuario';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;

  Contratacao: string[] = ['Horista', 'Parcial', 'Integral'];
  tipo: string[] = ['Professor', 'Coordenador', 'Administrador'];

  usuario!: Usuario;
  idUsuario!: number;
  usId!: number;
  usEmail!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: ValidacaoCadastroService,
    private usuarioService: UserService
  ) { }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
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

  async obterIdUsuarioPeloEmail(email: string) {
    try {
      const usuario = await this.usuarioService.obterUsuarioPorEmail(email);

      if (usuario) {
        this.idUsuario = usuario.usuarioId;

        if (this.idUsuario !== null) {
          console.log('ID do usuário obtido pelo e-mail:', this.idUsuario);
          this.associarProfessor(this.idUsuario, this.usId);
        } else {
          console.log('ID do usuário é nulo.');
        }
      } else {
        console.log('Nenhum usuário encontrado para o e-mail:', email);
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 404) {
          console.log('Usuário não encontrado (404):', error);
        } else {
          console.error('Erro HTTP ao obter usuário pelo e-mail:', error);
        }
      } else {
        console.error('Erro desconhecido ao obter usuário pelo e-mail:', error);
      }
    }
  }

  associarProfessor(usuarioId: number | null, id: number) {
    if (usuarioId !== null) {
      this.usuarioService.associarProfessor(usuarioId, id).subscribe(
        (response) => {
          console.log('Associação bem-sucedida:', response);
        },
        (error) => {
          console.error('Erro ao associar professor:', error);
        }
      );
    } else {
      console.log('ID do usuário é nulo. Não é possível associar o professor.');
    }
  }

  criarUsuario() {
    this.usuario = {
      usuarioId: null as unknown as number,
      usuarioNome: this.registroForm.get('name')?.value,
      usuarioEmail: this.registroForm.get('email')?.value,
      statusAtivo: "ATIVADO",
      usuarioCpf: null as unknown as string,
      professorCarga: null as unknown as number,
      tipoContratacao: null as unknown as string,
      tipoUsuario: null as unknown as string,
      curEscolhidos: null as unknown as string,
      discEscolhidos: [],
    };

    this.usuarioService.adicionarUsuario(this.usuario)
      .subscribe(
        (response) => {
          console.log('Usuário criado com sucesso:', response);
          this.usuario = response;
        },
        (error) => {
          console.error('Erro ao criar usuário:', error);
        }
      );
    this.service.signup(this.registroForm.value).subscribe((res) => {
      console.log("teste", res);
      const id = res.id;
      this.usId = id;
      const email = res.email
      this.usEmail = email
      alert('Registro criado com Sucesso!');
      this.registroForm.reset();
      this.router.navigate(['login']);
    },
      (err) => {
        alert('Registro não efetuado!');
      }
    );
    this.obterIdUsuarioPeloEmail(this.usuario.usuarioEmail);
  }
}
