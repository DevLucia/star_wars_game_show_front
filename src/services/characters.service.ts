import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class CharactersService {
    constructor(
      private http: HttpClient
    ) { }

    public getAll(page: number): Promise < any > {
        return this.http.get(`${environment.swapiURL}/people/?page=${page}`).toPromise();
    }

}

