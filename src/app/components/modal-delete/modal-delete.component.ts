import { Component, Inject, OnInit } from '@angular/core';
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
export class ModalDeleteComponent implements OnInit{
  private info: any;
  constructor(
    public dialogRef: MatDialogRef<ModalDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cursoService: CursoService,
    private disciplinaService: DisciplinaService,
    private professorService: ProfessorService,
    private coreService: CoreService,
  ) {}

  ngOnInit(): void {
    switch (this.data.tipo) {
      case "curso":
        this.cursoService.obterCurso(this.data.id).subscribe(data => {
          this.data.nome = data.cursoNome
          this.info = data
        })
        break;
      case "disciplina":
        this.disciplinaService.getDisciplina(this.data.id).subscribe(data => {
          this.data.nome = data.disciplinaNome
          this.info = data
        });
        
        break;
      case "professor":
        this.professorService.obterProfessor(this.data.id).subscribe(data => {
          this.data.nome = data.usuarioNome
          this.info = data
        });
        break;
    
      default:
        break;
    }
  }


  onConfirm(): void {

    this.info.statusAtivo = "DESATIVADO"
    switch (this.data.tipo) {
      case "curso":
        this.cursoService.atualizarCurso(this.info).subscribe(data => {
        })
        break;
      case "disciplina":
        this.disciplinaService.atualizarDisciplina(this.info.disciplinaId ,this.info).subscribe(data => {
        });
        
        break;
      case "professor":
        this.professorService.atualizarProfessor(this.info).subscribe(data => {
        });
        break;
    
      default:
        break;
    }
  }

  onCancel(): void {
    this.dialogRef.close(false); // Retorna false ao fechar o modal
  }

}