import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RetornoGenerico } from './classes/respostaGenerico.model';
import {retry } from 'rxjs/operators';
import { Filial } from './classes/filial.model';

@Injectable()
export class FilialService {
    
    
    constructor(private httpClient:HttpClient){}
    
    private readonly API = `${environment.API}/filial`
    public filial:Filial
    public RecuperarFilial(id:string):Promise<RetornoGenerico>{
        
        return this.httpClient.get(`${this.API}/${id}`)
               .toPromise()
               .then((resposta:RetornoGenerico) => {
                   console.log(resposta)
                   this.filial = resposta.retorno
                   return resposta;
               })
        
    }
    
}