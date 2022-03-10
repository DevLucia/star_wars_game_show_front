import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { Character } from '../models/character';
import { Contestant } from '../models/contestant';
import { environment } from '../environments/environment';

@Injectable()
export class ContestantsService {
    constructor(
        private http: HttpClient
    ) { }

    public getAll(): Promise < any > {

        // let params: HttpParams = new HttpParams();

        // params = params.append('token', this.getToken());

        return this.http.get(`${environment.starWarsApiURl}/contestants/`).toPromise();
    }

    // public insert(casouso: CasosUso): Observable<any> {

    //     return this.http.post(`${environment.reportsUrl}/api/casos-uso`, { casouso: casouso, token: this.getToken() }).map(res => res);
    // }

    // public update(casousoEdited: CasosUso): Observable<any> {
    //     return this.http.put(`${environment.reportsUrl}/api/casos-uso`, { casouso: casousoEdited, token: this.getToken() }).map(res => res);
    // }
    // public delete(id: number): Observable<any> {
    //     let params: HttpParams = new HttpParams();
    //     params = params.append('token', this.getToken());

    //     return this.http.delete(`${environment.reportsUrl}/api/casos-uso/${id}`, { params: params }).map(res => res);
    // }

    // public uploadFile(casouso: CasosUsoExp[]): Observable<any> {

    //     return this.http.post(`${environment.reportsUrl}/api/casos-uso/file`, { casouso: casouso, token: this.getToken() }).map(res => res);
    // }


    // getToken() {
    //     return window.sessionStorage.getItem('token');
    // }
}

