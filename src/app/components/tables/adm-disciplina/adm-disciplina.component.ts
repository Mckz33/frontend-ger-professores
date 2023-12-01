import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from '../../forms/emp-add-edit/emp-add-edit.component';
import { DisAddEditComponent } from '../../forms/dis-add-edit/dis-add-edit.component';
import { CursAddEditComponent } from '../../forms/curs-add-edit/curs-add-edit.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../core/core.service';
import { DisciplinaService } from 'src/app/services/disciplina.service';

@Component({
  selector: 'app-adm-disciplina',
  templateUrl: './adm-disciplina.component.html',
  styleUrls: ['./adm-disciplina.component.css']
})

export class AdmDisciplinaComponent implements OnInit {
    displayedColumns: string[] = [
      'id',
      'disciplina_nome',
      'disciplina_carga',
      'cursos',
      'trimestre',
      'action',
    ];
  
    dataSource!: MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    constructor(
      private _dialog: MatDialog,
      private _discService: DisciplinaService,
      private _coreService: CoreService,
        ) {}
  
    ngOnInit(): void {
      this.getDisciplinaList();
    }
  
    abrirAddEditProfForm() {
      const dialogRef = this._dialog.open(EmpAddEditComponent);
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getDisciplinaList();
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
  
    getDisciplinaList() {
      this._discService.getDisciplinaList().subscribe({
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
  
    deletarDisciplina(id: number) {
      this._discService.deletarDisciplina(id).subscribe({
        next: (res) => {
          this._coreService.openSnackBar('Disciplina removida!', 'done');
          this.getDisciplinaList();
        },
        error: console.log,
      });
    }
  
    abrirEditForm(data: any) {
      const dialogRef = this._dialog.open(DisAddEditComponent, {
        data,
      });
  
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getDisciplinaList();
          }
        },
      });
    }
  }