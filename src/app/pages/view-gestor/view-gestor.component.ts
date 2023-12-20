import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';
import { associacao } from 'src/app/models/associacao';
import { Curso } from 'src/app/models/curso';
import { Disciplina } from 'src/app/models/disciplina';
import { Usuario } from 'src/app/models/usuario';
import { AssociacaoService } from 'src/app/services/associacao.service';
import { CursoService } from 'src/app/services/curso.service';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { ProfessorService } from 'src/app/services/usuario.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-view-gestor',
  templateUrl: './view-gestor.component.html',
  styleUrls: ['./view-gestor.component.css']
})
export class ViewGestorComponent implements OnInit {
  displayedColumns: string[] = [
    'disciplinaNome',
    'cargaHoraria',
    'cursoNome',
    'trimestre',
    'status'
  ];

  trimestresList: string[] = [
    'PRIMEIRO_TRIMESTRE',
    'SEGUNDO_TRIMESTRE',
    'TERCEIRO_TRIMESTRE',
    'QUARTO_TRIMESTRE',
  ];

  private operacoesConcluidas = new Subject<void>();

  options: string[] = [];
  myControl = new FormControl('');
  filteredOptions!: Observable<string[]>;

  cargaHorariaDisponivel!: number;
  respostaAtualizaProfessor!: string;
  trimestreSelecionado: any;
  profSelecionado = '';
  filtroCurso: FormControl = new FormControl('');
  dataSource!: MatTableDataSource<any>;
  getCurso!: Curso[];
  novoCurso!: Curso[];

  associassoesList: associacao[] = [];
  disciplinaList: Disciplina[] = [];
  CursoList: Curso[] = [];
  professoresList: Usuario[] = [];
  getUsuario: Usuario[] = [];
  professoresSet: Set<Usuario> = new Set<Usuario>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _discService: DisciplinaService,
    private _cursoService: CursoService,
    private _professorService: ProfessorService,
    private _associassaoService: AssociacaoService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getCursoList();
    this.getAssociacoePendentes();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.operacoesConcluidas.subscribe(() => {
      alert("Alterações Salvas com sucesso")
      location.reload();
    });
  }

  logOut() {
    const confirmacao = confirm('Deseja sair do sistema?');
    if (confirmacao) {
      localStorage.removeItem('token');
      this._router.navigate(['login']);
    }
  }

  atualizarCargaHoraria(carga: number, status: boolean){
    status? this.cargaHorariaDisponivel-=carga: this.cargaHorariaDisponivel+=carga
  }

  salvarAssociacoes() {
    if(this.cargaHorariaDisponivel<0){
      alert(`O professor ${this.profSelecionado} está sobrecarregado.`)
    }else{

      const operacoesPendentes = this.dataSource.data.length;
      let operacoesConcluidas = 0;
    
      const operacaoConcluida = () => {
        operacoesConcluidas++;
        if (operacoesConcluidas === operacoesPendentes) {
          // Todas as operações foram concluídas
          this.operacoesConcluidas.next();
        }
      };
    
      this.dataSource.data.forEach(row => {
        if (row.status) {
          this.aprovarAssociacao(row.associacao, operacaoConcluida);
        } else {
          this.reprovarAssociacao(row.associacao, operacaoConcluida);
        }
      });
    }
  }
  
  
  aprovarAssociacao(associacao: any, callback: () => void) {
    this._associassaoService.aprovarAssociacao(associacao.associacaoId).subscribe(
      () => {
        callback(); // Chama o callback quando a operação estiver concluída
      },
      error => {
        
        callback(); // Chama o callback mesmo em caso de erro
      }
    );
  }
  
  reprovarAssociacao(associacao: any, callback: () => void) {
    this._associassaoService.negarAssociacao(associacao.associacaoId).subscribe(
      () => {
        callback(); // Chama o callback quando a operação estiver concluída
      },
      error => {
        callback(); // Chama o callback mesmo em caso de erro
      }
    );
  }
  
  
  

  getCursoList() {
    this._cursoService.obterCursos().subscribe((cursoList) => {this.CursoList = cursoList})
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  async atualizaProfessor(row: any){
    
    this._discService.atualizarProfessorDisciplina(row.disciplinaId, row.usuario.usuarioId).subscribe(data => {

    },
    (error) => {
    });
    
  }

  compareUsuarios(usuario1: any, usuario2: any): boolean {
    return usuario1 && usuario2 ? usuario1.usuarioId === usuario2.usuarioId : usuario1 === usuario2;
  }

  getAssociacoePendentes() {
    this._associassaoService.obterAssociacoesPendentes().subscribe(associassoes => {
      this.associassoesList = associassoes
      this.associassoesList.map(associassoes => this.professoresSet.add(associassoes.usuario))

    })
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  aplicarFiltroProfessor(usuarioNome: string) {
    // Filtra a lista original de associações
    const associacoesFiltradas = this.associassoesList.filter(associacao => associacao.usuario.usuarioNome === usuarioNome);
  
    // Obtém uma cópia completa da lista original de cursos
    const cursosOriginais = [...this.CursoList];
  
    // Filtra a lista de cursos com base nas associações filtradas
    this.CursoList = cursosOriginais.filter(curso =>
      curso.disciplinas.some(d => associacoesFiltradas.some(a => a.disciplina.disciplinaId === d.disciplinaId))
    );
  
    // Cria a fonte de dados com base nas associações filtradas e nos cursos filtrados
    const infoDataSource = associacoesFiltradas.map((associacao: { disciplina: { disciplinaId: string; }; dataRegistro: Date }) => {
      const curso = this.CursoList.find(curso => curso.disciplinas.some(d => d.disciplinaId === associacao.disciplina.disciplinaId));
      return { cursoNome: curso?.cursoNome, associacao };
    });

    infoDataSource.sort((a, b) => {
      const dataRegistroA = a.associacao.dataRegistro.getTime();
      const dataRegistroB = b.associacao.dataRegistro.getTime();
    
      return dataRegistroA - dataRegistroB;
    });
    
    // Atualiza a fonte de dados da tabela
    this.dataSource = new MatTableDataSource(infoDataSource);
  
    // Se não houver associações, redefina a fonte de dados
    if (associacoesFiltradas.length === 0) {
      this.dataSource.data = [];
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.cargaHorariaDisponivel = associacoesFiltradas[0].usuario.professorCarga
  }

  aplicarFiltroTrimestre(trimeste: string) {
    this.dataSource.filter = trimeste.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

