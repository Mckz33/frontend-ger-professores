import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { DisciplinaService } from 'src/app/services/disciplina.service';

@Component({
  selector: 'app-dis-add-edit',
  templateUrl: './dis-add-edit.component.html',
  styleUrls: ['./dis-add-edit.component.css'],
})
export class DisAddEditComponent implements OnInit {
  disciplinaForm: FormGroup;

  cursos: string[] = [
    'ADS',
    'Engenharia de Software',
    'Ciência da Computação',
    'Engenharia da Computação',
  ];

  constructor(
    private _fb: FormBuilder,
    private _disService: DisciplinaService,
    private _dialogRef: MatDialogRef<DisAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.disciplinaForm = this._fb.group({
      nome: '',
      sigla: '',
      carga: '',
      curso: '',
      professor: '',
    });
  }

  ngOnInit(): void {}

  onFormSubmit() {
    if (this.disciplinaForm.valid) {
      if (this.data) {
        this._disService
          .atualizarDisciplina(this.data.id, this.disciplinaForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar(
                'Disciplina atualizada com sucesso!'
              );
              console.log(this.data);
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._disService
          .adicionarDisciplina(this.disciplinaForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar(
                'Disciplina adicionada com sucesso!'
              );
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
