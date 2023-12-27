import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, startWith, map, of } from 'rxjs';
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
  displayedColumnsCurso: string[] = [
    'position',
    'disciplinaNome',
    'disciplinaCarga',
    'trimestre',
    'usuario',
    'status'
  ];

  displayedColumns: string[] = [
    'position',
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

  cursoSelecionado = '';
  cargaHorariaDisponivel!: number;
  respostaAtualizaProfessor!: string;
  trimestreSelecionado: any;
  profSelecionado = '';
  filtroCurso: FormControl = new FormControl('');
  dataSource!: MatTableDataSource<any>;
  dataSourceProfessor!: MatTableDataSource<any>;
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
  opcoesCursos: Observable<string[]> | undefined;
  objetoProfessorSelecionado!: Usuario;

  constructor(
    private _discService: DisciplinaService,
    private _cursoService: CursoService,
    private _professorService: ProfessorService,
    private _associassaoService: AssociacaoService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    // this.getAssociacoePendentes();
    // this.getCursoList();

    this._associassaoService.obterAssociacoesPendentes().subscribe(associassoes => {
      this.associassoesList = associassoes
      this.associassoesList.forEach((associassoes) => {
        const { usuario } = associassoes;

        // Check if the user name is not already in the set
        if (!this.isUsuarioNomeInSet(usuario.usuarioNome)) {
          this.professoresSet.add(usuario);
        }
      });
      this._cursoService.obterCursos().subscribe((cursoLista) => { 
        const associacoesDisciplinaIdList = this.associassoesList.map(assoc => assoc.disciplina?.disciplinaId).filter(id => id !== undefined);
        // const associacoesDisciplinaIdList = this.associassoesList.map(assoc => assoc.disciplina.disciplinaId);
        this.CursoList = cursoLista
        this.CursoList = cursoLista.filter((curso) => 
          curso.disciplinas.some(d => associacoesDisciplinaIdList.includes(d.disciplinaId))
        );
      });

    })
  
    this.operacoesConcluidas.subscribe(() => {
      alert("Alterações Salvas com sucesso")
      location.reload();
    });
  }

  // verificaSobrecarga(professor: Usuario  | string) {
  //   if (professor){
  //     if (typeof professor === "string") {
  //       return this._professorService.verificarCargaHorariaExcedida(this.objetoProfessorSelecionado, this.associassoesList)
  //     }else
  //     return this._professorService.verificarCargaHorariaExcedida(professor, this.associassoesList)
  //   }
  //   return false
  // }
  


  logOut() {
    const confirmacao = confirm('Deseja sair do sistema?');
    if (confirmacao) {
      localStorage.removeItem('token');
      this._router.navigate(['login']);
    }
  }

  aplicarFiltroCurso(cursoNome: string) {
    this.getAssociasoesPorCurso(cursoNome);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAssociasoesPorCurso(cursoNome: string) {
    const curso: Curso | undefined = this.CursoList.find(
      (c) => c.cursoNome === cursoNome
    );

    this.cursoSelecionado = curso?.cursoNome ?? '';

    this.disciplinaList = curso?.disciplinas ?? [];
    this.options = this.disciplinaList.map(d => d.disciplinaNome)
    const associacoesFiltradas = this.associassoesList.filter(assoc => this.options.includes(assoc.disciplina.disciplinaNome))
    
    associacoesFiltradas.sort((a, b) => {
      const dataRegistroA = new Date(a.dataRegistro).getTime();
      const dataRegistroB = new Date(b.dataRegistro).getTime();

      return dataRegistroA - dataRegistroB;
    });

    
    const dataSourceData = associacoesFiltradas.map((data, index) => ({
      ...data,
      position: index + 1
    }));
    this.dataSource = new MatTableDataSource(dataSourceData);

    this.dataSource.sort = this.sort;
    this.dataSource._renderChangesSubscription;
  }

  atualizarCargaHoraria(carga: number, status: boolean) {
    status ? this.cargaHorariaDisponivel -= carga : this.cargaHorariaDisponivel += carga

  }

  calcularCargaHorariaTotal(professorNome: string, flag: boolean = false): number {
    // Filtra as associações do professor
    const associacoesProfessor = this.dataSource.data.filter(row => row.usuario.usuarioNome === professorNome);
    
    if (flag) {
      return associacoesProfessor.reduce((total, row) => total + (row.status ? row.disciplina.disciplinaCarga : 0), 0);
    }
    return associacoesProfessor.reduce((total, row) => total + row.disciplina.disciplinaCarga , 0);

  }

  salvarAssociacoes() {
    // Itera sobre professores únicos
    const professoresUnicos = [...new Set(this.dataSource.data.map(row => row.usuario))];
  
    for (const professor of professoresUnicos) {
      const cargaHorariaTotal = this.calcularCargaHorariaTotal(professor.usuarioNome, true);
  
      // Verifica se a carga horária total excede a carga horária disponível
      if (cargaHorariaTotal > professor.professorCarga) {
        alert(`O professor ${professor.usuarioNome} está sobrecarregado.`);
        return; // Aborta a função salvarAssociações
      }
    }

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
        const associacao = {
          associacaoId: row.associacaoId,
          disciplina: row.disciplina,
          usuario: row.usuario
        }
        if (row.status) {
          this.aprovarAssociacao(associacao, operacaoConcluida);
        } else {
          this.reprovarAssociacao(associacao, operacaoConcluida);
        }
      });
    
  }
  salvarAssociacoesProf() {
    if (this.cargaHorariaDisponivel < 0) {
      alert(`O professor ${this.profSelecionado} está sobrecarregado.`)
    } else {

      const operacoesPendentes = this.dataSourceProfessor.data.length;
      let operacoesConcluidas = 0;

      const operacaoConcluida = () => {
        operacoesConcluidas++;
        if (operacoesConcluidas === operacoesPendentes) {
          // Todas as operações foram concluídas
          this.operacoesConcluidas.next();
        }
      };

      this.dataSourceProfessor.data.forEach(row => {
        const associacao = {
          associacaoId: row.associacaoId,
          disciplina: row.disciplina,
          usuario: row.usuario
        }
        if (row.status) {
          this.aprovarAssociacao(associacao, operacaoConcluida);
        } else {
          this.reprovarAssociacao(associacao, operacaoConcluida);
        }
      });
    }
  }



  aprovarAssociacao(associacao: any, callback: () => void) {
    this._associassaoService.aprovarAssociacao(associacao.associacaoId).subscribe(
      () => {
        this._discService.atualizarProfessorDisciplina(associacao.disciplina.disciplinaId, associacao.usuario.usuarioId).subscribe({ error: console.log });

        callback(); // Chama o callback quando a operação estiver concluída
      },
      error => {

        this._discService.atualizarProfessorDisciplina(associacao.disciplina.disciplinaId, associacao.usuario.usuarioId).subscribe({ error: console.log });

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




  // getCursoList() {
  //   this._cursoService.obterCursos().subscribe((cursoLista) => { 
  //     const associacoesDisciplinaIdList = this.associassoesList.map(assoc => assoc.disciplina?.disciplinaId).filter(id => id !== undefined);
  //     // const associacoesDisciplinaIdList = this.associassoesList.map(assoc => assoc.disciplina.disciplinaId);
  //     this.CursoList = cursoLista
  //     this.CursoList = cursoLista.filter((curso) => 
  //       curso.disciplinas.some(d => associacoesDisciplinaIdList.includes(d.disciplinaId))
  //     );
  //   });
  // }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  async atualizaProfessor(row: any) {

    this._discService.atualizarProfessorDisciplina(row.disciplinaId, row.usuario.usuarioId).subscribe(data => {

    },
      (error) => {
      });

  }

  compareUsuarios(usuario1: any, usuario2: any): boolean {
    return usuario1 && usuario2 ? usuario1.usuarioId === usuario2.usuarioId : usuario1 === usuario2;
  }

  // getAssociacoePendentes() {
  //   this._associassaoService.obterAssociacoesPendentes().subscribe(associassoes => {
  //     this.associassoesList = associassoes
  //     this.associassoesList.forEach((associassoes) => {
  //       const { usuario } = associassoes;

  //       // Check if the user name is not already in the set
  //       if (!this.isUsuarioNomeInSet(usuario.usuarioNome)) {
  //         this.professoresSet.add(usuario);
  //       }
  //     });


  //   })
  // }

  private isUsuarioNomeInSet(usuarioNome: string): boolean {
    for (const professor of this.professoresSet) {
      if (professor.usuarioNome === usuarioNome) {
        return true;
      }
    }
    return false;
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  aplicarFiltroProf(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProfessor.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceProfessor.paginator) {
      this.dataSourceProfessor.paginator.firstPage();
    }
  }

  aplicarFiltroProfessor(usuarioNome: string) {

    this.profSelecionado = usuarioNome;
    // Filtra a lista original de associações
    const associacoesFiltradas = this.associassoesList.filter(associacao => associacao.usuario.usuarioNome === usuarioNome);

    // Cria a fonte de dados com base nas associações filtradas e nos cursos filtrados
    const infoDataSource = associacoesFiltradas.map((associacao: associacao) => {
      const curso = this.CursoList.find(curso => curso.disciplinas.find(d => d.disciplinaId === associacao.disciplina.disciplinaId));
      return { cursoNome: curso?.cursoNome, ...associacao };
    });

    infoDataSource.sort((a, b) => {
      const dataRegistroA = new Date(a.dataRegistro).getTime();
      const dataRegistroB = new Date(b.dataRegistro).getTime();

      return dataRegistroA - dataRegistroB;
    });

    // Atualiza a fonte de dados da tabela
    this.dataSourceProfessor = new MatTableDataSource(infoDataSource);

    this.dataSourceProfessor.data.forEach((data: { position: any; }, index: number) => {
      data.position = index + 1;
    });

    // Se não houver associações, redefina a fonte de dados
    if (associacoesFiltradas.length === 0) {
      this.dataSourceProfessor.data = [];
    }
    if (this.dataSourceProfessor.paginator) {
      this.dataSourceProfessor.paginator.firstPage();
    }

    this.cargaHorariaDisponivel = associacoesFiltradas[0].usuario.professorCarga
    this.objetoProfessorSelecionado = associacoesFiltradas[0].usuario
    this.dataSourceProfessor._renderChangesSubscription;
  }

  aplicarFiltroTrimestre(trimeste: string) {
    this.dataSource.filter = trimeste.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  aplicarFiltroTrimestreProfessor(trimeste: string) {
    this.dataSourceProfessor.filter = trimeste.trim().toLowerCase();

    if (this.dataSourceProfessor.paginator) {
      this.dataSourceProfessor.paginator.firstPage();
    }
  }
  
}

