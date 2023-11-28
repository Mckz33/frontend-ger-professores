import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css'],
})
export class EmpAddEditComponent implements OnInit {
  profForm: FormGroup;

  cursos: string[] = [
    'ADS',
    'Engenharia de Software',
    'Ciência da Computação',
    'Engenharia da Computação',
  ];

  disciplinas: string[] = [
    'Lógica de Programação',
    'Programação I',
    'Programação II',
    'Programação Web I',
  ];

  tipoDeContratacao: string[] = ['Horista', 'Parcial', 'Integral'];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.profForm = this._fb.group({
      nome: '',
      cpf: '',
      email: '',
      disc: '',
      curs: '',
      contratacao: '',
      hora: '',
    });
  }

  ngOnInit(): void {
    this.profForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.profForm.valid) {
      if (this.data) {
        this._empService
          .atualizarProfessor(this.data.id, this.profForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar(
                'Professor atualizado com sucesso!'
              );
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._empService.adicionarProfessor(this.profForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Professor adicionado com sucesso!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
