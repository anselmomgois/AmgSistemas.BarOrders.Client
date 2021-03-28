import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProdutoFilial } from './classes/produtoFilial.model';
import { RetornoGenerico } from './classes/respostaGenerico.model';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProdutoFilialService {

    constructor(private httpClient:HttpClient){}
    
    private readonly API = `${environment.API}/ProdutoFilial`
    public produtosFilial:ProdutoFilial[]

    public RecuperarProdutosFilial(idEmpresa:string, idFilial:string):Observable<RetornoGenerico>{

        return this.httpClient.get<RetornoGenerico>(`${this.API}/${idEmpresa}/${idFilial}`).pipe(retry(10))
    }
}