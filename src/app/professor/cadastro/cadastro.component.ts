import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  constructor(private http: HttpClient, private location: Location) {}
  cursos: { value: string; label: string }[] = [];
  disciplinas: { value: string; label: string }[] = [];
  cursosArray: { value: string; label: string }[] = [];
  disciplinasArray: { value: string; label: string }[] = [];
  cursoSelecionado: boolean = false;
  disciplinaSelecionada: boolean = false;
  ngOnInit(): void {
    this.carregarCursos();
    this.carregarDisciplinas();
  }
  // Método para voltar
  voltar() {
    this.location.back();
  } // No início do seu componente

  onCursoSelect(item: any) {
    console.log('Curso selecionado:', item);
    this.cursoSelecionado = true;
    this.cursosArray.push(item); // Certifique-se de adicionar o item ao array
  }

  onCursoDeSelect(item: any) {
    console.log('Curso desselecionado:', item);
    this.cursoSelecionado = this.cursosArray.length > 0;
    // Remova o item do array, se necessário
  }

  onDisciplinaSelect(item: any) {
    console.log('Disciplina selecionada:', item);
    this.disciplinaSelecionada = true;
    this.disciplinasArray.push(item); // Certifique-se de adicionar o item ao array
  }

  onDisciplinaDeSelect(item: any) {
    console.log('Disciplina desselecionada:', item);
    this.disciplinaSelecionada = this.disciplinasArray.length > 0;
    // Remova o item do array, se necessário
  }

  carregarCursos() {
    this.http.get('http://localhost:3000/cursos').subscribe((data: any) => {
      this.cursos = data.map((curso: any) => ({
        value: curso.id,
        label: curso.nome,
      }));
    });
  }

  carregarDisciplinas() {
    this.http
      .get('http://localhost:3000/disciplinas')
      .subscribe((data: any) => {
        this.disciplinas = data.map((disciplina: any) => ({
          value: disciplina.id,
          label: disciplina.nome,
        }));
      });
  }
  nome: string = '';
  tipoContratacao: string = '';
  horarioDisponivel: number = 0;
  errorMessage: string = '';

  dropdownSettings = {
    singleSelection: false,
    idField: 'value',
    textField: 'label',
    selectAllText: 'Selecionar Todos',
    unSelectAllText: 'Desselecionar Todos',
    allowSearchFilter: true,
  };

  cadastrarProfessor() {
    console.log('Nome:', this.nome);
    console.log('Tipo de Contratação:', this.tipoContratacao);
    console.log('Horário Disponível:', this.horarioDisponivel);
    console.log('Cursos Selecionados:', this.cursoSelecionado);
    console.log('Disciplinas Selecionadas:', this.disciplinasArray);
    console.log('cursoSelecionado:', this.cursoSelecionado);
    console.log('disciplinaSelecionada:', this.disciplinaSelecionada);

    // Atribui a condição diretamente às propriedades
    this.cursoSelecionado = this.cursosArray.length > 0;
    this.disciplinaSelecionada = this.disciplinasArray.length > 0;

    // Verifica se todos os campos foram preenchidos corretamente
    if (
      typeof this.nome === 'string' &&
      this.nome.trim() !== '' &&
      this.tipoContratacao &&
      this.horarioDisponivel !== undefined &&
      !isNaN(Number(this.horarioDisponivel)) &&
      Number(this.horarioDisponivel) >= 0 &&
      this.cursoSelecionado &&
      this.disciplinaSelecionada
    ) {
      // Lógica para cadastrar o professor
      console.log('Professor cadastrado com sucesso!');
      this.errorMessage = ''; // Limpa a mensagem de erro, caso exista
      alert('Foi cadastrado com sucesso!');
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      if (
        this.horarioDisponivel !== undefined &&
        Number(this.horarioDisponivel) < 0
      ) {
        this.errorMessage += ' O horário disponível não pode ser negativo.';
      }
      if (!this.cursoSelecionado) {
        this.errorMessage += ' Selecione pelo menos um curso válido.';
      }
      if (!this.disciplinaSelecionada) {
        this.errorMessage += ' Selecione pelo menos uma disciplina válida.';
      }

      console.log('Erro:', this.errorMessage);
    }
  }
}
