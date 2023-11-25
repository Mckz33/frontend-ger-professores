// cadastro.component.ts
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CadastroService } from 'src/app/services/cadastro.service';
import { Curso } from 'src/app/models/curso';
import { Disciplina } from 'src/app/models/disciplina';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfessorService } from 'src/app/services/professor.service';

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

  empForm: FormGroup;

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
    private fb: FormBuilder,
    private _empProfessor: ProfessorService
  ) {
    this.empForm = this.fb.group({
      nome: '',
      curso: '',
      disciplina: '',
      tipoContratacao: '',
      horarioDisponivel: '',
    });
  }

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

  onFormSubmit() {
    if (this.empForm.valid) {
      this._empProfessor.adicionarProfessor(this.empForm.value).subscribe({
        next: (val: any) => {
          alert('Professor cadastrado com sucesso!');
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}
