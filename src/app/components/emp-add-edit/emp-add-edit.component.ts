import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { Disciplina } from 'src/app/models/disciplina';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css'],
})
export class EmpAddEditComponent implements OnInit {
  profForm: FormGroup;

  curso: Curso[] = [];
  disciplina: Disciplina[] = [];
  professor!: Professor[];

  tipoDeContratacao: string[] = ['Horista', 'Parcial', 'Integral'];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,

    private cursoService: CursoService,
    private disciplinaService: DisciplinaService,
    private professorService: ProfessorService
  ) {
    this.profForm = this._fb.group({
      nome: '',
      cpf: '',
      email: '',
      curs: [{
        nome: ''
      }],
      disc: [{
        nome: ''
      }],
      contratacao: '',
      hora: ''
    });
  }

  ngOnInit(): void {
    this.profForm.patchValue(this.data);

    this.professorService.getProfessorList().subscribe(p => {
      this.professor = p;
    });

     this.cursoService.getCursoList().subscribe(c => {
       this.curso = c;
     });

     this.disciplinaService.getDisciplinaList().subscribe(c => {
      this.disciplina = c;
   });
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
