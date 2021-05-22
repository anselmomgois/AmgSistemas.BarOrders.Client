import { Filial } from './classes/filial.model';
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
    
    public recuperarProdutosFilial(idEmpresa:string, idFilial:string):Promise<RetornoGenerico>{
        
        return this.httpClient.get(`${this.API}/${idEmpresa}/${idFilial}`)
        .toPromise()
        .then((resposta:RetornoGenerico) => {
            this.produtosFilial = resposta.retorno
            return resposta;
        })
    }
    
    public recuperarProdutosFilialMemoria():ProdutoFilial[]{
        
        if(this.produtosFilial == undefined || this.produtosFilial == null)
        {
            if(localStorage.getItem('dadosFilial') != null)
            {
                let dadosFilial = localStorage.getItem('dadosFilial')
                let filial:Filial = JSON.parse(dadosFilial)

                this.recuperarProdutosFilial(filial.empresa.identificador, filial.identificador)
                .then((resposta:RetornoGenerico) => {
                    this.produtosFilial = resposta.retorno
                })
            }
        }
        
        return this.produtosFilial
    }

}