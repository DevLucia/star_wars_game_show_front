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
        return this.http.get(`${environment.starWarsApiURl}/contestants/`).toPromise();
    }

    public insert(contestant: Contestant): Promise<any> {
      return this.http.post(`${environment.starWarsApiURl}/contestants`, { contestant }).toPromise();
    }

    public update(contestant: Contestant, id: string): Promise<any> {
      return this.http.put(`${environment.starWarsApiURl}/contestants/${id}`, { contestant }).toPromise();
    }

    public delete(id: string): Promise<any> {
        return this.http.delete(`${environment.starWarsApiURl}/contestants/${id}`).toPromise();
    }
}

