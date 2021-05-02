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
  providers:[GrupoProdutoServices, ProdutoFilialService,MesaService]
})
export class HomeComponent implements OnInit {
  
  public filial:Filial
  public gruposProdutos:GrupoProduto[]
  public imageUrlHome:any
  public produtosFilial:ProdutoFilial[]
  public mesa:Mesa
  
  constructor(private filialService:FilialService,
    private route:ActivatedRoute,
    private grupoProdutoService:GrupoProdutoServices,
    private sanitizer: DomSanitizer,
    private produtoFilialService:ProdutoFilialService,
    private mesaService:MesaService){}
    private tempoObservableSubscription: Subscription
    
    ngOnInit(): void {
      
      this.route.params.subscribe((parametros: Params) => { 
        
        this.filialService.RecuperarFilial(parametros.id)
        .then((retorno:RetornoGenerico) => {
          
          this.filial = retorno.retorno  
          this.imageUrlHome = this.sanitizer.bypassSecurityTrustUrl ('data:image/jpg;base64,' + this.filial.empresa.logo);  
          
          this.grupoProdutoService.RecuperarGruposProdutos(parametros.id)
          .subscribe((retorno:RetornoGenerico) => {
            this.gruposProdutos = retorno.retorno;
            console.log(this.gruposProdutos)
          }, 
          (error:any) => {
            console.log(error)
          })
          
          this.produtoFilialService.RecuperarProdutosFilial(parametros.id, this.filial.empresa.identificador)
          .subscribe((retorno:RetornoGenerico)=> {
            this.produtosFilial = retorno.retorno
            let idGrupoProduto:string
            
            this.produtosFilial.forEach((produto:ProdutoFilial) => {
              if(idGrupoProduto !== produto.identificadorGrupoProduto)
              {
                produto.bolExibirGrupoProduto = true
              }
              
              idGrupoProduto = produto.identificadorGrupoProduto
              produto.imageUrl = this.sanitizer.bypassSecurityTrustUrl ('data:image/jpg;base64,' + produto.imagem); 
            });
            
            let tempo = interval(2000)
            this.tempoObservableSubscription = tempo.subscribe((intervalo:number) => {
              
              this.mesaService.RecuperarMesa(parametros.idMesa)
              .then((retornoMesa:RetornoGenerico)=> {
                this.mesa = retornoMesa.retorno
                if(this.mesa.codigoEstado === 'OC') {
                  this.tempoObservableSubscription.unsubscribe()
                }
              } )
              
            })
          })
          
        })
        
      })
      
    }
    
  }
  