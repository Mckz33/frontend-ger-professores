import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProfessorService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dados-perfil',
  templateUrl: './dados-perfil.component.html',
  styleUrls: ['./dados-perfil.component.css'],
})
export class DadosPerfilComponent implements OnInit {
  usuarioNome: string = '';
  usuarioCpf: string = '';
  usuarioEmail: string = '';

  constructor(
    private snackBar: MatSnackBar,
    private professorService: ProfessorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.obterDetalhesUsuario();
  }

  // Função para exibir mensagem de erro usando o MatSnackBar.
  exibirMensagemErro(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  // Obtendo detalhes do usuário (email).
  obterDetalhesUsuario() {
    this.professorService.obterProfessorList().subscribe(
      (dadosUsuario) => {
        this.usuarioEmail = dadosUsuario.email;
      },
      (erro) => {
        console.error('Erro ao obter detalhes do usuário', erro);
      }
    );
  }

  // Cadastro de Professor.
  cadastrar() {
    const novoProfessor = {
      usuarioNome: this.usuarioNome,
      usuarioCpf: this.usuarioCpf,
      usuarioEmail: this.usuarioEmail,
      statusAtivo: "ATIVADO"
    };

    // Validar o campo de nome
    if (!this.usuarioNome || this.usuarioNome.trim() === '') {
      this.exibirMensagemErro('Por favor, preencha o campo de nome.');
      return;
    }

    // Validar o campo de CPF
    if (!this.usuarioCpf || !this.validarCPF(this.usuarioCpf)) {
      this.exibirMensagemErro('Por favor, informe um CPF válido.');
      return;
    }

    this.professorService.adicionarProfessor(novoProfessor).subscribe(
      () => {
        this.limparCampos();

        this.snackBar.open('Perfil atualizado com sucesso.', 'Fechar', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });

        // Rota de acesso a página de home caso passe pelas validações.
        this.router.navigate(['/home']);

      },
      (error) => {
        console.error('Erro ao atualizar o perfil.', error);

        // Exibir mensagem de erro
        this.snackBar.open('Erro ao atualizar o perfil.', 'Fechar', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    );
  }

  // Função para validar CPF.
  validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');
    return cpf.length === 11;
  }

  // Limpeza dos campos.
  limparCampos() {
    this.usuarioNome = '';
    this.usuarioCpf = '';

    this.snackBar.open('Os campos foram limpos.', 'Fechar', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
