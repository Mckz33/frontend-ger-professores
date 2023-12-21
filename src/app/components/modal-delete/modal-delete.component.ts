import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CursoService } from 'src/app/services/curso.service';
import { CoreService } from '../core/core.service';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { ProfessorService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private cursoService: CursoService,
    private disciplinaService: DisciplinaService,
    private professorService: ProfessorService,
    private coreService: CoreService,
  ) {}

  onConfirm(): void {
    if(this.data.tipo == "curso"){
      this.cursoService.deletarCurso(this.data.id).subscribe({
        next: (val: any) => {
          this.coreService.openSnackBar('Curso deletado com sucesso!');
          this.dialogRef.close(true); // Retorna true ao fechar o modal
        }
      })
    }
    if(this.data.tipo == "disciplina"){
      this.disciplinaService.deletarDisciplina(this.data.id).subscribe({
        next: (val: any) => {
          this.coreService.openSnackBar('Disciplina deletado com sucesso!');
          this.dialogRef.close(true); // Retorna true ao fechar o modal
        }
      })
    }
    if(this.data.tipo == "professor"){
      this.professorService.deletarProfessor(this.data.id).subscribe({
        next: (val: any) => {
          this.coreService.openSnackBar('Professor deletado com sucesso!');
          this.dialogRef.close(true); // Retorna true ao fechar o modal
        }
      })
    }
  }

  onCancel(): void {
    this.dialogRef.close(false); // Retorna false ao fechar o modal
  }
}

interface Data {
  id: number,
  tipo: tipo,
  nome: string
}

enum tipo {
  curso = "curso",
  disciplina = "disciplina",
  professor = "professor"
}