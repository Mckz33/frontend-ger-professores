import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from 'src/app/components/forms/emp-add-edit/emp-add-edit.component';
import { DisAddEditComponent } from 'src/app/components/forms/dis-add-edit/dis-add-edit.component';
import { CursAddEditComponent } from 'src/app/components/forms/curs-add-edit/curs-add-edit.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/components/core/core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prof-view',
  templateUrl: './prof-view.component.html',
  styleUrls: ['./prof-view.component.css']
})
export class ProfViewComponent {
  displayedColumns: string[] = [
    'id',
    'nome_professor',
    'disciplina',
    'curso',
    'trimestre',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService,
    private route: Router,
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

  logOut() {
    const confirmacao = confirm('Deseja sair do sistema?');
    if (confirmacao) {
      localStorage.removeItem('token');
      this.route.navigate(['login']);
    }
  }
}
