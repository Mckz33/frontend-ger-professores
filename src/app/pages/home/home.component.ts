import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  isCoordenador: boolean = false;
  isGestor: boolean = false;
  constructor(
    private route: Router,
    private auth: AuthGuardService
    ) { }

  ngOnInit(): void {
    this.isCoordenador = this.auth.isCoordenador();
    this.isGestor = this.auth.isGestor();
  }

  logOut() {
    const confirmacao = confirm('Deseja sair do sistema?');
    if (confirmacao) {
      localStorage.removeItem('token');
      this.route.navigate(['login']);
    }
  }
}
