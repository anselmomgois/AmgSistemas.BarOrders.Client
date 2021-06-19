import { CONST_DADOS_FILIAL } from './classes/constantes';
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
                   this.filial = resposta.retorno
                   localStorage.setItem(CONST_DADOS_FILIAL,JSON.stringify(this.filial))
                   return resposta;
               })
        
    }

    public RetornarDadosFilialMemoria():Filial {

        if(this.filial == undefined || this.filial == null)
        {
          this.filial = JSON.parse(localStorage.getItem(CONST_DADOS_FILIAL))
        }

        return this.filial
    }
    
}