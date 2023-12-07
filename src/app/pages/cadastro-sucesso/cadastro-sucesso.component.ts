import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-sucesso',
  templateUrl: './cadastro-sucesso.component.html',
  styleUrls: ['./cadastro-sucesso.component.css']
})
export class CadastroSucessoComponent {

  constructor(private router: Router) {}

  voltarAoCadastro() {
    this.router.navigate(['/registro/professor']);
  }

}
