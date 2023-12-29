import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, startWith, map } from 'rxjs';
import { ModalCadastroCursoComponent } from 'src/app/components/modal-cadastro-curso/modal-cadastro-curso.component';
import { ModalCadastroDisciplinaComponent } from 'src/app/components/modal-cadastro-disciplina/modal-cadastro-disciplina.component';
import { ModalDeleteComponent } from 'src/app/components/modal-delete/modal-delete.component';
import { ModalEditarCursoComponent } from 'src/app/components/modal-editar-curso/modal-editar-curso.component';
import { ModalEditarDisciplinaComponent } from 'src/app/components/modal-editar-disciplina/modal-editar-disciplina.component';
import { associacao } from 'src/app/models/associacao';
import { Curso } from 'src/app/models/curso';
import { Disciplina } from 'src/app/models/disciplina';
import { Usuario } from 'src/app/models/usuario';
import { AssociacaoService } from 'src/app/services/associacao.service';
import { CursoService } from 'src/app/services/curso.service';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { ProfessorService } from 'src/app/services/usuario.service';



@Component({
  selector: 'app-view-cursos',
  templateUrl: './view-cursos.component.html',
  styleUrls: ['./view-cursos.component.css']
})
export class ViewCursosComponent implements OnInit {
  displayedColumns: string[] = [
    'disciplinaNome',
    'disciplinaCarga',
    'trimestre',
    'usuario',
    'action'
  ];

  trimestresList: string[] = [
    'PRIMEIRO_TRIMESTRE',
    'SEGUNDO_TRIMESTRE',
    'TERCEIRO_TRIMESTRE',
    'QUARTO_TRIMESTRE',
  ];

  icones = {
    ok: "https://img.icons8.com/color/48/000000/ok--v1.png",
    vazio: "https://img.icons8.com/fluency/48/000000/circled.png",
    erro: "https://img.icons8.com/color/48/error--v1.png",
    aguardando: "https://img.icons8.com/ios-glyphs/60/hourglass--v1.png"
  }

  options: string[] = [];
  myControl = new FormControl('');
  filteredOptions!: Observable<string[]>;

  trimestreSelecionado: any;
  cursoSelecionado = '';
  cursoSelecionadoId!: number;

  profSelecionado: Usuario[] = [];

  respostaAtualizaProfessor!: string;
  dataSource!: MatTableDataSource<any>;

  associacoesList: associacao[] = [];
  disciplinaList: Disciplina[] = [];
  CursoList: Curso[] = [];
  professoresList: Usuario[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _discService: DisciplinaService,
    private _cursoService: CursoService,
    private _professorService: ProfessorService,
    private _associacaoService: AssociacaoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCursoList();
    this.getProfessoresList();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.verificarStatusTabela();
  }

  editarCurso(cursoId: number): void {
    const dialogRef = this.dialog.open(ModalEditarCursoComponent, {
      data: { id: cursoId }// Pass cursoId to the modal
    });

    // Subscribe to the afterClosed() method to get data back from the modal if needed
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
  editarDisciplina(row: any) {
    const dialogRef = this.dialog.open(ModalEditarDisciplinaComponent, {
      data: { id: row.disciplinaId }// Pass cursoId to the modal
    });

    // Subscribe to the afterClosed() method to get data back from the modal if needed
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
  excluir(tipo: string, id: number) {
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      data: { tipo: tipo, id: id }// Pass cursoId to the modal
    });

    // Subscribe to the afterClosed() method to get data back from the modal if needed
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  criarDisciplina(): void {
    const dialogRef = this.dialog.open(ModalCadastroDisciplinaComponent, {
      width: '400px',
      data: { cursoId: this.cursoSelecionadoId }// Pass cursoId to the modal
    });

    // Subscribe to the afterClosed() method to get data back from the modal if needed
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  criarCurso() {
    const dialogRef = this.dialog.open(ModalCadastroCursoComponent, {
      width: '400px', // Set the width as per your requirement
      // You can add other MatDialogConfig options here
    });

    // Subscribe to the afterClosed event to get the result when the modal is closed
    dialogRef.afterClosed().subscribe(result => {
      // Handle the result if needed
      console.log('The modal was closed with result:', result);
    });

  }

  verificarStatusTabela() {
    if (this.dataSource) {
      this.dataSource.data.forEach(row => {
        row.statusIcon = this.getIconSource(row.status);
      });
    }
  }


  getIconSource(status: string) {

    switch (status) {
      case 'Professor associado à disciplina.':
        return this.icones.ok;
      case 'Carga horária do professor excedida':
        return this.icones.erro;
      case 'Aguardando aprovação':
        return this.icones.aguardando;
      default:
        return this.icones.vazio;
    }
  }

  getCursoList() {
    this._cursoService.obterCursos().subscribe({
      next: (res) => {
        // FILTRAR AQUI CURSOS DO COORDENADOR
        this.CursoList = res;
        this.getDisciplinaList(this.CursoList[0].cursoNome);
      },
      error: console.log,
    });
  }

  compareUsuarios(usuario1: any, usuario2: any): boolean {
    return usuario1 && usuario2 ? usuario1.usuarioId === usuario2.usuarioId : usuario1 === usuario2;
  }

  getDisciplinaList(cursoNome: string) {
    const curso: Curso | undefined = this.CursoList.find(
      (c) => c.cursoNome === cursoNome
    );

    this.cursoSelecionado = curso?.cursoNome ?? '';
    this.cursoSelecionadoId = curso?.cursoId ?? -1;

    this.disciplinaList = curso?.disciplinas.filter(disciplina => disciplina.statusAtivo == "ATIVADO") ?? [];
    this.options = this.disciplinaList.map(d => d.disciplinaNome)

    this.dataSource = new MatTableDataSource(this.disciplinaList);

    this._associacaoService.obterAssociacoesPendentes().subscribe(data => {

      this.dataSource.data.map(row => {
        const usuario = data.find(associacao => associacao.disciplina.disciplinaId === row.disciplinaId)?.usuario
        if (row.usuario) {
          row.status = "Professor associado à disciplina."
        }
        else if (usuario) {
          row.usuario = usuario
          row.status = 'Aguardando aprovação'
        }
      })
      this.verificarStatusTabela();
    })

    this.dataSource.sort = this.sort;
    this.dataSource._renderChangesSubscription;

  }

  getProfessoresList() {
    this._professorService.obterProfessorList().subscribe({
      next: (res) => {
        this.professoresList = res.filter(
          (professor: { tipoUsuario: string }) =>
            professor.tipoUsuario === 'PROFESSOR'
        );
      },
      error: console.log,
    });
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  aplicarFiltroCurso(cursoNome: string) {
    this.getDisciplinaList(cursoNome);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  aplicarFiltroTrimestre(trimeste: string) {
    this.dataSource.filter = trimeste.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // FUNCIONANDO FAVOR N MECHER !!!!!! //
  exportCsv(): void {
    // Inicializa uma string vazia chamada 'csv'.
    let csv = '';

    // Loop para percorrer cada coluna no array 'columns'.
    for (let column = 0; column < this.displayedColumns.length; column++) {
      // Adiciona o nome da coluna seguido por um ponto e vírgula à string 'csv'.
      csv += this.displayedColumns[column] + ';';

      // Remove qualquer quebra de linha na string 'csv'.
      csv = csv.replace(/\n/g, '');
    }

    // Remove o último ponto e vírgula da string 'csv' e adiciona uma quebra de linha.
    csv = csv.substring(0, csv.length - 1) + '\n';

    // Obtém as linhas filtradas do objeto que possui os dados.
    const rows = this.dataSource.data;

    // Loop para percorrer cada linha nas linhas filtradas.
    for (let row = 0; row < rows.length; row++) {
      let keys = this.displayedColumns;
      // Retira o status de salvamento do csv
      keys.pop();
      // Loop para percorrer cada elemento na linha atual.
      keys.forEach((key) => {
        if (key != keys[keys.length - 1]) {
          csv += rows[row][key] + ';';
        } else {
          csv += rows[row][key]?.usuarioNome + ',';
        }
        // Adiciona o valor do elemento na string 'csv'.
      });

      // Remove o último ponto e vírgula da string 'csv' e adiciona uma quebra de linha.
      csv = csv.substring(0, csv.length - 1) + '\n';
    }

    // Remove a última quebra de linha da string 'csv'.
    csv = csv.substring(0, csv.length - 1) + '\n';

    // Cria um elemento de documento (link) usando JavaScript.
    const docElement = document.createElement('a');

    // Adiciona o caractere BOM (Byte Order Mark) universal à string 'csv'.
    const universalBOM = '\uFEFF';

    // Concatena o nome do arquivo com a data atual para formar o nome do arquivo completo.
    let filename = 'Alocação-de-Professores_';
    let currentDateString = new Date();
    filename = filename.concat(currentDateString.toString());
    const fileNameWithType = filename.concat('.csv');

    // Configura o link para apontar para os dados CSV, com codificação UTF-8.
    docElement.href =
      'data:text/csv;charset=utf-8,' + encodeURI(universalBOM + csv);

    // Define o alvo do link como '_blank' para abrir em uma nova guia/janela.
    docElement.target = '_blank';

    // Define o atributo de download do link com o nome do arquivo CSV.
    docElement.download = fileNameWithType;

    // Simula um clique no link para iniciar o download do arquivo CSV.
    docElement.click();
  }
}
