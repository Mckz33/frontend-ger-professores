import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import { CoreService } from '../core/core.service';
import { filter, debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-modal-cadastro-curso',
  templateUrl: './modal-cadastro-curso.component.html',
  styleUrls: ['./modal-cadastro-curso.component.css']
})
export class ModalCadastroCursoComponent implements OnInit {
  cursoForm: FormGroup;
  cursosAutocomplete: Curso[] = []; // Array for autocomplete options
  filteredOptions: any;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<ModalCadastroCursoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private cursoService: CursoService,
  ) {
    this.cursoForm = this._fb.group({
      cursoNome: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cursoService.obterCursos().subscribe((c) => {
      this.cursosAutocomplete = c;
    });
    this.filteredOptions = this.cursoForm.valueChanges.pipe(
      filter((value) => value?.length > 3),
      debounceTime(500),
      switchMap(value => this.filterCursos(value))
    );
  }
  
  onNoClick() {
    this._dialogRef.close(true);
  }

  displayCurso(curso: Curso): string {
    return curso ? curso.cursoNome : '';
  }


  filterCursos(value: string): Curso[] {
    if (value && value.length >= 3) {
    const filterValue = value.toLowerCase();
      return this.cursosAutocomplete.filter((curso) =>
        curso.cursoNome.toLowerCase().includes(filterValue)
      );
    }
    return []

  }

  onFormSubmit() {
    if (this.cursoForm.valid) {
      const novoCurso: Curso = {
        cursoId: 0,
        cursoNome: this.cursoForm.value.cursoNome,
        disciplinas: [],
        statusAtivo: "ATIVADO"
      };

      this.cursoService.adicionarCurso(novoCurso).subscribe({
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
