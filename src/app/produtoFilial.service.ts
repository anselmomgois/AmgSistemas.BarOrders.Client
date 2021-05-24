import { Filial } from './classes/filial.model';
import { ProdutoFilial } from './classes/produtoFilial.model';
import { RetornoGenerico } from './classes/respostaGenerico.model';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promise } from 'selenium-webdriver';

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
    
    public recuperarProdutosFilialMemoria():Promise<ProdutoFilial[]>{
        
        
        if(this.produtosFilial == undefined || this.produtosFilial == null)
        {
            console.log(localStorage.getItem('dadosFilial'))
            if(localStorage.getItem('dadosFilial') != null)
            {
                let dadosFilial = localStorage.getItem('dadosFilial')
                let filial:Filial = JSON.parse(dadosFilial)
                
                return this.httpClient.get(`${this.API}/${filial.empresa.identificador}/${filial.identificador}`)
                .toPromise()
                .then((resposta:RetornoGenerico) => {
                    this.produtosFilial = resposta.retorno
                    return this.produtosFilial;
                })                
            }
        }     
        else
        {
            console.log('retornando produtos 2')
            return new Promise((resolve) => {                       
                resolve(this.produtosFilial)
            })
        }   

        console.log('retornando produtos 3')
        
    }
    
}