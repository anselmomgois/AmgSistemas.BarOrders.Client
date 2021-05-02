import { RetornoGenerico } from './classes/respostaGenerico.model';
import { Mesa } from './classes/mesa.model';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MesaService {

    constructor(private httpClient:HttpClient){}
    
    private readonly API = `${environment.API}/mesa`
    public mesa:Mesa
    public RecuperarMesa(id:string):Promise<RetornoGenerico>{
        
        return this.httpClient.get(`${this.API}/${id}`)
               .toPromise()
               .then((resposta:RetornoGenerico) => {
                   this.mesa = resposta.retorno
                   return resposta;
               })
        
    }
}