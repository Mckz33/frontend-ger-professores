// cadastro.component.ts
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroService } from 'src/app/services/cadastro.service';
import { ValidacaoCadastroService } from 'src/app/services/validacao-cadastro.service';
import { Curso } from 'src/app/models/curso';
import { Disciplina } from 'src/app/models/disciplina';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  cursos: Curso[] = [];
  disciplinas: Disciplina[] = [];
  cursosArray: Curso[] = [];
  disciplinasArray: Disciplina[] = [];
  cursoSelecionado: boolean = false;
  disciplinaSelecionada: boolean = false;
  nome: string = '';
  tipoContratacao: string = '';
  horarioDisponivel: number = 0;
  errorMessage: string = '';

  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'nome',
    selectAllText: 'Selecionar Todos',
    unSelectAllText: 'Desselecionar Todos',
    allowSearchFilter: true,
  };

  constructor(
    private location: Location,
    private cadastroService: CadastroService,
    private validacaoCadastroService: ValidacaoCadastroService
  ) {}

  ngOnInit(): void {
    this.carregarCursos();
    this.carregarDisciplinas();
  }

  voltar() {
    this.location.back();
  }

  onCursoSelect(item: any) {
    console.log('Curso selecionado:', item);
    this.cursoSelecionado = true;
    this.cursosArray.push(item);
  }

  onCursoDeSelect(item: any) {
    console.log('Curso desselecionado:', item);
    this.cursoSelecionado = this.cursosArray.length > 0;
  }

  onDisciplinaSelect(item: any) {
    console.log('Disciplina selecionada:', item);
    this.disciplinaSelecionada = true;
    this.disciplinasArray.push(item);
  }

  onDisciplinaDeSelect(item: any) {
    console.log('Disciplina desselecionada:', item);
    this.disciplinaSelecionada = this.disciplinasArray.length > 0;
  }

  carregarCursos() {
    this.cadastroService.getCursos().subscribe((data: Curso[]) => {
      this.cursos = data;
    });
  }

  carregarDisciplinas() {
    this.cadastroService.getDisciplinas().subscribe((data: Disciplina[]) => {
      this.disciplinas = data;
    });
  }

  cadastrarProfessor() {
    this.cadastroService.cadastrarProfessor(
      this.nome,
      this.tipoContratacao,
      this.horarioDisponivel,
      this.cursosArray,
      this.disciplinasArray
    );
  }
}
