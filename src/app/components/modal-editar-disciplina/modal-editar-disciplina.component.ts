import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Disciplina } from 'src/app/models/disciplina';
import { CursoService } from 'src/app/services/curso.service';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { CoreService } from '../core/core.service';
import { ModalCadastroDisciplinaComponent } from '../modal-cadastro-disciplina/modal-cadastro-disciplina.component';

@Component({
  selector: 'app-modal-editar-disciplina',
  templateUrl: './modal-editar-disciplina.component.html',
  styleUrls: ['./modal-editar-disciplina.component.css']
})
export class ModalEditarDisciplinaComponent implements OnInit {
  disciplinaForm: FormGroup;
  disciplinasAutocomplete: Set<string> = new Set();
  cursoId: number;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<ModalCadastroDisciplinaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private disciplinaService: DisciplinaService,
    private cursoService: CursoService,
    private _coreService: CoreService,
  ) {
    this.cursoId = this.data.cursoId;
    this.disciplinaForm = this._fb.group({
      disciplinaNome: ['', Validators.required],
      disciplinaCarga: [null, [Validators.required,Validators.min(0)]],
      trimestre: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.disciplinaService.getDisciplinaList().subscribe((disciplinas) => {
      disciplinas.forEach((disciplina: Disciplina) => {
        this.disciplinasAutocomplete.add(disciplina.disciplinaNome);
      });
    });

    
    this.disciplinaService.getDisciplina(this.data.id).subscribe(data => {
      this.disciplinaForm.value.disciplinaNome = data.disciplinaNome; 
      this.disciplinaForm.value.disciplinaCarga = data.disciplinaCarga;
      this.disciplinaForm.value.trimestre = data.trimestre;
    });
    
  }

  onNoClick() {
    this._dialogRef.close(true);
  }

  onFormSubmit() {
    if (this.disciplinaForm.valid) {
      const cargaHorariaAjustada = this.arredondarParaBaixo(+this.disciplinaForm.value.disciplinaCarga);

      const novaDisciplina: Disciplina = {
        disciplinaId: this.data.id,
        disciplinaNome: this.disciplinaForm.value.disciplinaNome,
        disciplinaCarga: +cargaHorariaAjustada,
        trimestre: this.disciplinaForm.value.trimestre, // Exemplo, ajuste conforme sua lógica
        statusAtivo: 'ATIVADO'
      };

      this.disciplinaService.atualizarDisciplina(novaDisciplina.disciplinaId, novaDisciplina).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Disciplina atualizada com sucesso!');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
          // Tratar erro, se necessário
        }
      });
    } else {
      // Tratamento de erros/formulário inválido, se necessário
    }
  }
  
  filterDisciplinas(value: string): string[] {
    if (value && value.length >= 3) {
      const autocomplete = Array.from(this.disciplinasAutocomplete.values());
      const filterValue = value.toLowerCase();
      return autocomplete.filter((disciplina) =>
      disciplina.toLowerCase().includes(filterValue)
      );
    }
      return []
  }

  displayDisciplina(disciplina: Disciplina): string {
    return disciplina ? disciplina.disciplinaNome : '';
  }

  private arredondarParaBaixo(valor: number): number {
    // Arredondar para baixo para o múltiplo de 2 mais próximo
    return Math.floor(valor / 2) * 2;
  }
}
