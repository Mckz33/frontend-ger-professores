import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { CursoService } from 'src/app/services/curso.service';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { Disciplina } from 'src/app/models/disciplina';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-curs-add-edit',
  templateUrl: './curs-add-edit.component.html',
  styleUrls: ['./curs-add-edit.component.css'],
})
export class CursAddEditComponent implements OnInit {
  cursoForm: FormGroup;

  usuario_coordenador!: Usuario;
  disciplinas!: Disciplina[];

  trimestres: string[] = ['1', '2', '3', '4'];

  constructor(
    private _fb: FormBuilder,
    private _curService: CursoService,
    private _dialogRef: MatDialogRef<CursAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private disciplinaService: DisciplinaService
  ) {
    this.cursoForm = this._fb.group({
      curso_nome: '',
      trimestre: '',
      usuario_coordenador: '',
    });
  }

  ngOnInit(): void {
    this.disciplinaService.getDisciplinaList().subscribe(c => {
      this.disciplinas = c;
    });
  }

  onFormSubmit() {
    if (this.cursoForm.valid) {
      if (this.data) {
        this._curService
          .atualizarCurso(this.data.id, this.cursoForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Curso atualizado com sucesso!');
              console.log(this.data);
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._curService.adicionarCurso(this.cursoForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Curso adicionado com sucesso!');
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
