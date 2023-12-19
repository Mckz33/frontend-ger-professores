import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-modal-cadastro-curso',
  templateUrl: './modal-cadastro-curso.component.html',
  styleUrls: ['./modal-cadastro-curso.component.css']
})
export class ModalCadastroCursoComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalCadastroCursoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Curso,
    private cursoService: CursoService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  cadastrarCurso(): void {
    console.log(this.data)
    if (!this.dadosSaoValidos()) {
      return;
    }
  
    // Chame o serviço para adicionar o novo curso
    this.cursoService.adicionarCurso(this.data).subscribe(
      novoCurso => {
      },
      erro => {
      }
    );
  
    this.dialogRef.close();
  }

  private dadosSaoValidos(): boolean {
    if (!this.data.cursoNome) {
      return false;
    }
    return true;
  }

}
