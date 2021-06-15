import { CONST_EXIBIR_CARRINHO, CONST_EXIBIR_PRODUTOS } from './../classes/constantes';
import { CarrinhoService } from './../carrinho.service';
import { ItemPedido } from './../classes/itemPedido.model';
import { Mesa } from './../classes/mesa.model';
import { GrupoProduto } from './../classes/grupoProduto.model';
import { RetornoGenerico } from './../classes/respostaGenerico.model';
import { FilialService } from './../filial.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Filial } from '../classes/filial.model';
import { DomSanitizer } from '@angular/platform-browser';
import { GrupoProdutoServices } from '../grupoProduto.services';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers:[GrupoProdutoServices]
})
export class TopoComponent implements OnInit {
  
  constructor(private carrinhoService:CarrinhoService) { }
    
    @Input() public filial:Filial
    @Input() public imageUrl:any    
    @Input() public gruposProdutos:GrupoProduto[]
    @Input() public mesa:Mesa
    @Input() public quantidadeItens:number    
    @Output() public exibirCarrinho:EventEmitter<string> = new EventEmitter()
    @Input() public exibirCategorias:boolean = true;

    ngOnInit(): void {
      
     this.quantidadeItens = this.carrinhoService.retornarQuantidade()   
      
    }
    
    public ExibirCarrinho():void {           
      this.exibirCategorias = false
      this.exibirCarrinho.emit(CONST_EXIBIR_CARRINHO)
    }  

    public exibirHome() :void {
      this.exibirCategorias = true
      this.exibirCarrinho.emit(CONST_EXIBIR_PRODUTOS)
    }
  }
  