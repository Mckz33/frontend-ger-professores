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
  ngOnInit(): void {
    this.carregarCursos();
    this.carregarDisciplinas();
  }
  // Método para voltar
  voltar() {
    this.location.back();
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

  cursos: { value: string; label: string }[] = [
    { value: 'ADS', label: 'Análise e Desenvolvimento de Sistemas' },
    { value: 'RC', label: 'Redes de Computadores' },
    { value: 'DG', label: 'Design Gráfico' },
  ];

  // Declaração das disciplinas
  disciplinas: { value: string; label: string }[] = [
    { value: 'prog', label: 'Programação' },
    { value: 'emp', label: 'Empreendedorismo' },
    { value: 'usa', label: 'Usabilidade' },
  ];
  dropdownSettings = {
    singleSelection: false,
    idField: 'value',
    textField: 'label',
    selectAllText: 'Selecionar Todos',
    unSelectAllText: 'Desselecionar Todos',
    allowSearchFilter: true,
  };
  curso: string[] = [];
  disciplina: string[] = [];
  cadastrarProfessor() {
    // Verifica se todos os campos foram preenchidos
    if (
      typeof this.nome === 'string' &&
      this.nome.trim() !== '' &&
      this.cursos.length > 0 &&
      this.disciplinas.length > 0 &&
      this.tipoContratacao &&
      this.horarioDisponivel !== undefined &&
      !isNaN(Number(this.horarioDisponivel)) &&
      Number(this.horarioDisponivel) >= 0
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
    }
  }
}
