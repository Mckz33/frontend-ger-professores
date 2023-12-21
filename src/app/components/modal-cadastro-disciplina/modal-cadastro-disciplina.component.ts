import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Disciplina } from 'src/app/models/disciplina';
import { CursoService } from 'src/app/services/curso.service';
import { DisciplinaService } from 'src/app/services/disciplina.service';

@Component({
  selector: 'app-modal-cadastro-disciplina',
  templateUrl: './modal-cadastro-disciplina.component.html',
  styleUrls: ['./modal-cadastro-disciplina.component.css']
})
export class ModalCadastroDisciplinaComponent {
  // disciplina: Disciplina;
  // cursoId: number;

  constructor(
    public dialogRef: MatDialogRef<ModalCadastroDisciplinaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalCadastroDisciplinaComponent,
    private cursoService: CursoService,
    private disciplinaService: DisciplinaService
  ) {
    // Access data like this
    // this.disciplina = data.disciplina;
    // this.cursoId = data.cursoId;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // cadastrarDisciplina(): void {
  //   if (!this.dadosSaoValidos()) {
  //     return;
  //   }

  //   // Criar a disciplina
  //   this.disciplinaService.adicionarDisciplina(this.disciplina).subscribe(
  //     disciplinaCriada => {
  //       // Associar a disciplina ao curso
  //       this.cursoService.associarCursoDisciplina(this.cursoId, disciplinaCriada.disciplinaId).subscribe(
  //         resultado => {
  //           alert("Disciplina cadastrada e associada ao curso com sucesso!");
  //         },
  //         erro => {
  //           // Tratar erro, se necessário
  //         }
  //       );
  //     },
  //     erro => {
  //       // Tratar erro, se necessário
  //     }
  //   );

  //   this.dialogRef.close();
  // }

  private dadosSaoValidos(): boolean {
    // Lógica de validação dos dados
    return true;
  }
}