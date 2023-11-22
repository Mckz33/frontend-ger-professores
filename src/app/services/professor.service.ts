import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ProfessorService {

    constructor(private _http: HttpClient) { }

    adicionarProfessor(data: any): Observable<any> {
        return this._http.post('http://localhost:3000/professor', data);
    }

    getProfessorList(): Observable<any> {
        return this._http.get('http://localhost:3000/professor');
    }

}