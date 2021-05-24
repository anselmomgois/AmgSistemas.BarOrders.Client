import { CarrinhoItem } from './../classes/carrinhoItem.model';
import { ItemPedido } from './../classes/itemPedido.model';
import { ProdutoFilialService } from './../produtoFilial.service';
import { ProdutoFilial } from './../classes/produtoFilial.model';
import { CarrinhoService } from './../carrinho.service';
import { Pedido } from './../classes/pedido.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  
  public pedido:Pedido
  public produtosFilial:ProdutoFilial[]
  public carrinhoItens:CarrinhoItem[] = []
  public valorTotal:number = 0

  constructor(private carrinhoService:CarrinhoService,
    private produtoFilialService:ProdutoFilialService) { }
    
    ngOnInit(): void {
      
      this.pedido = this.carrinhoService.retornarPedido()
      
      this.produtoFilialService.recuperarProdutosFilialMemoria()
      .then((produtosRetorno:ProdutoFilial[]) => {
        
        this.produtosFilial = produtosRetorno
        
        if(this.pedido != undefined && this.pedido != null && this.pedido.itensPedido != undefined && this.pedido.itensPedido != null &&
          this.pedido.itensPedido.length > 0)
          {
            let itemLista:number = 0
            
            this.pedido.itensPedido.forEach((item:ItemPedido) => {
              let produtoCorrente = this.produtosFilial.find((pf:ProdutoFilial) => pf.identificador == item.identificadorProdutoFilial)
              
              if(produtoCorrente != undefined && produtoCorrente != null)
              { 
                itemLista += 1
                
                this.carrinhoItens.push(new CarrinhoItem(itemLista,item.identificadorProdutoFilial,produtoCorrente.descricao,
                  item.quantidade,produtoCorrente.valor,(item.quantidade*produtoCorrente.valor)))

                  this.valorTotal += (item.quantidade*produtoCorrente.valor)
                  
                }
                
              })
            }
          })   
        }
        
        public removerItem(itemRemover:CarrinhoItem):void {
          
          this.carrinhoService.removerItemCarrinho(itemRemover.identificador)
          
          let itemRemoverPesquisado :CarrinhoItem =  this.carrinhoItens.find((item:CarrinhoItem) => item.identificador == itemRemover.identificador)
          
          if(itemRemoverPesquisado != undefined && itemRemoverPesquisado != null)
          {
            let index = this.carrinhoItens.indexOf(itemRemoverPesquisado)
            this.carrinhoItens.splice(index)
          } 
          
        }
        
        public Incrementar(itemAtualizar:CarrinhoItem): void {
          
          let quantidade = this.carrinhoService.IncrementarQuantidade(itemAtualizar.identificador)
          
          let itemAtualizarPesquisado :CarrinhoItem =  this.carrinhoItens.find((item:CarrinhoItem) => item.identificador == itemAtualizar.identificador)
          
          if(itemAtualizarPesquisado != undefined && itemAtualizarPesquisado != null)
          {
            itemAtualizarPesquisado.quantidade = quantidade
          } 
          
        }
        
        public Decrementar(itemAtualizar:CarrinhoItem):void {
          
          let quantidade = this.carrinhoService.DecrementarQuantidade(itemAtualizar.identificador)
          
          let itemAtualizarPesquisado :CarrinhoItem =  this.carrinhoItens.find((item:CarrinhoItem) => item.identificador == itemAtualizar.identificador)
          
          if(itemAtualizarPesquisado != undefined && itemAtualizarPesquisado != null)
          {
            itemAtualizarPesquisado.quantidade = quantidade
          } 
          
        }
        
      }
      