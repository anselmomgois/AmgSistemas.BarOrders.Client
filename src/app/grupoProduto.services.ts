import { retry } from 'rxjs/operators';
import { RetornoGenerico } from './classes/respostaGenerico.model';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { GrupoProduto } from './classes/grupoProduto.model';

@Injectable()
export class GrupoProdutoServices
{

    constructor(private httpClient:HttpClient){} 
    
    private readonly API = `${environment.API}/grupoProduto`

    public gruposProdutos:GrupoProduto[]

    public RecuperarGruposProdutos(idEmpresa:string):Observable<RetornoGenerico>{

        return this.httpClient.get<RetornoGenerico>(`${this.API}/${idEmpresa}`).pipe(retry(10))
    }
}