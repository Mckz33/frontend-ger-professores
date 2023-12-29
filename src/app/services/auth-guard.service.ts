import { Injectable } from '@angular/core';
import { ProfessorService } from './usuario.service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private professorService: ProfessorService) {}

  isCoordenador() {
    const UID = localStorage.getItem('UID');
    if (UID) {
      this.professorService.obterProfessor(+UID).subscribe((usuario) => {
        if (usuario.tipoUsuario == 'COORDENADOR') {
          return true;
        }
        return false;
      });
    }
    return false
  }

  isGestor() {
    const UID = localStorage.getItem('UID');
    if (UID) {
      this.professorService.obterProfessor(+UID).subscribe((usuario) => {
        if (usuario.tipoUsuario == 'GESTOR') {
          return true;
        }
        return false;
      });
    }
    return false
  }
}
