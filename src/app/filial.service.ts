import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RetornoGenerico } from './classes/respostaGenerico.model';
import {retry } from 'rxjs/operators';

@Injectable()
export class Filial {


    constructor(private httpClient:HttpClient){}

    private readonly API = `${environment.API}/filial`

    public RecuperarFilial(id:string):Observable<RetornoGenerico>{

        return this.httpClient.get<RetornoGenerico>(this.API).pipe(retry(10))
    }
}