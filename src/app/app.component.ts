import { Component, OnInit } from '@angular/core';
import { ProfessorService } from './services/professor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend-ger-professores';

  constructor(private _empService: ProfessorService) {}

  ngOnInit(): void {
    this.getProfessorList();
  }

  getProfessorList() {
    this._empService.getProfessorList().subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }

}

