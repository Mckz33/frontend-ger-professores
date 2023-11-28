import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  constructor(private route:Router) {}

  logOut() {
    const confirmacao = confirm("Deseja sair do sistema?");
    if (confirmacao) {
      localStorage.removeItem('token');
      this.route.navigate(['login']);
    }
  }

}
