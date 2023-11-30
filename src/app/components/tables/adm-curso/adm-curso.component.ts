import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from '../../forms/emp-add-edit/emp-add-edit.component';
import { DisAddEditComponent } from '../../forms/dis-add-edit/dis-add-edit.component';
import { CursAddEditComponent } from '../../forms/curs-add-edit/curs-add-edit.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../core/core.service';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-adm-curso',
  templateUrl: './adm-curso.component.html',
  styleUrls: ['./adm-curso.component.css']
})
export class AdmCursoComponent implements OnInit{

  displayedColumns: string[] = [
    'curso_id',
    'curso_nome', 
    'coordenador',
    'trimestre',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _coreService: CoreService,
    private _cursoService: CursoService,
      ) {}

  ngOnInit(): void {
    this.getCursoList();
  }

  abrirAddEditProfForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCursoList();
        }
      },
    });
  }

  abrirAddEditDiscForm() {
    const dialogRef = this._dialog.open(DisAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
        }
      },
    });
  }

  abrirAddEditCursForm() {
    const dialogRef = this._dialog.open(CursAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
        }
      },
    });
  }

  getCursoList() {
    this._cursoService.getCursoList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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

  deletarCurso(id: number) {
    this._cursoService.deletarCurso(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Curso removido!', 'done');
        this.getCursoList();
      },
      error: console.log,
    });
  }

  abrirEditForm(data: any) {
    const dialogRef = this._dialog.open(CursAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCursoList();
        }
      },
    });
  }
}
