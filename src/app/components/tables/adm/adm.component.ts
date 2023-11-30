import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from '../../forms/emp-add-edit/emp-add-edit.component';
import { DisAddEditComponent } from '../../forms/dis-add-edit/dis-add-edit.component';
import { CursAddEditComponent } from '../../forms/curs-add-edit/curs-add-edit.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.css'],
})
export class AdmComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'primeiroNome',
    'CPF',
    'email',
    'disciplina',
    'contr',
    'trimestre',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService,
      ) {}

  ngOnInit(): void {
    this.getProfessorList();
  }

  abrirAddEditProfForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProfessorList();
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

  getProfessorList() {
    this._empService.getProfessorList().subscribe({
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

  deletarProfessor(id: number) {
    this._empService.deletarProfessor(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Professor removido!', 'done');
        this.getProfessorList();
      },
      error: console.log,
    });
  }

  abrirEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProfessorList();
        }
      },
    });
  }
}
