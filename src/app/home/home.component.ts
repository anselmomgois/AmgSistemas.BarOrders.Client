import { CONST_EXIBIR_CARRINHO } from './../classes/constantes';
import { CarrinhoService } from './../carrinho.service';
import { ItemPedido } from './../classes/itemPedido.model';
import { MesaAtendente } from './../classes/mesaAtendente.model';
import { Mesa } from './../classes/mesa.model';
import { MesaService } from './../mesa.service';
import { ProdutoFilial } from './../classes/produtoFilial.model';
import { ProdutoFilialService } from './../produtoFilial.service';
import { DomSanitizer } from '@angular/platform-browser';
import { GrupoProduto } from './../classes/grupoProduto.model';
import { GrupoProdutoServices } from './../grupoProduto.services';
import { RetornoGenerico } from './../classes/respostaGenerico.model';
import { FilialService } from './../filial.service';
import { Filial } from './../classes/filial.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[GrupoProdutoServices,MesaService]
})
export class HomeComponent implements OnInit {
  
  public filial:Filial
  public gruposProdutos:GrupoProduto[]
  public imageUrlHome:any
  public produtosFilial:ProdutoFilial[]
  public mesa:Mesa
  public quantidadeItens:number = 0
  public exibirCarrinho:boolean = false;
  
  constructor(private filialService:FilialService,
    private route:ActivatedRoute,
    private grupoProdutoService:GrupoProdutoServices,
    private sanitizer: DomSanitizer,
    private produtoFilialService:ProdutoFilialService,
    private mesaService:MesaService,
    private carrinhoService:CarrinhoService){}
    
    private tempoObservableSubscription: Subscription
    
    ngOnInit(): void {
      
      this.route.params.subscribe((parametros: Params) => { 
        
        if(localStorage.getItem(CONST_EXIBIR_CARRINHO) != null)
        {
          let exibirCarrinho = localStorage.getItem(CONST_EXIBIR_CARRINHO)
          this.exibirCarrinho = JSON.parse(exibirCarrinho)
        } 

        this.filialService.RecuperarFilial(parametros.id)
        .then((retorno:RetornoGenerico) => {
          this.filial = retorno.retorno  
          
          
          if (this.filial !== undefined && this.filial !== null) {
            this.imageUrlHome = this.sanitizer.bypassSecurityTrustUrl ('data:image/jpg;base64,' + this.filial.empresa.logo);  
            
            
            this.grupoProdutoService.RecuperarGruposProdutos(parametros.id)
            .subscribe((retorno:RetornoGenerico) => {
              this.gruposProdutos = retorno.retorno;             
            }, 
            (error:any) => {
              console.log(error)
            })
            
            this.produtoFilialService.recuperarProdutosFilial(parametros.id, this.filial.empresa.identificador)
            .then((retorno:RetornoGenerico)=> {
              this.produtosFilial = retorno.retorno
              let idGrupoProduto:string
              
              this.produtosFilial.forEach((produto:ProdutoFilial) => {
                if(idGrupoProduto !== produto.identificadorGrupoProduto)
                {
                  produto.bolExibirGrupoProduto = true
                }
                
                idGrupoProduto = produto.identificadorGrupoProduto
                produto.imageUrl = this.sanitizer.bypassSecurityTrustUrl ('data:image/jpg;base64,' + produto.imagem); 
                produto.quantidadeSolicitada = 0
              });
             
              let tempo = interval(2000)
              this.tempoObservableSubscription = tempo.subscribe((intervalo:number) => {
                
                this.mesaService.RecuperarMesa(parametros.idMesa)
                .then((retornoMesa:RetornoGenerico)=> {
                  this.mesa = retornoMesa.retorno
                  
                  if(this.mesa.codigoEstado === 'OC') {
                    this.tempoObservableSubscription.unsubscribe()
                    if(this.mesa.mesasAtendentes !== undefined && this.mesa.mesasAtendentes.length > 0){
                      if(this.filial.trabalhaPorMesa)
                      {
                        this.mesa.mesaAtendenteCorrente = this.mesa.mesasAtendentes[0]
                      }
                    }
                  }
                } )
                
              })
            }
            
            )
          }
        })
        
        
      })
      
    }
    
    public receberItemPedido(item:string){
      this.quantidadeItens = this.carrinhoService.retornarQuantidade()
      
    }
    
    public configurarVisibilidadeCarrinho(item:string):void {     
      
      this.exibirCarrinho = (item == CONST_EXIBIR_CARRINHO)  
      localStorage.setItem(CONST_EXIBIR_CARRINHO,JSON.stringify(this.exibirCarrinho))  
    }
  
}
