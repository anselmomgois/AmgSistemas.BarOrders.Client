import { RetornoGenerico } from './../classes/respostaGenerico.model';
import { PedidoService } from './../pedido.service';
import { CONST_ATUALIZAR_QUANTIDADE, CONST_EXIBIR_CARRINHO, CONST_EXIBIR_PRODUTOS, CONST_SEM_ERROS } from './../classes/constantes';
import { Mesa } from './../classes/mesa.model';
import { CarrinhoItem } from './../classes/carrinhoItem.model';
import { ItemPedido } from './../classes/itemPedido.model';
import { ProdutoFilialService } from './../produtoFilial.service';
import { ProdutoFilial } from './../classes/produtoFilial.model';
import { CarrinhoService } from './../carrinho.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
  providers:[PedidoService]
})
export class CarrinhoComponent implements OnInit {
  
  public produtosFilial:ProdutoFilial[]
  public carrinhoItens:CarrinhoItem[] = []
  public valorTotal:number = 0
  @Input() public mesa:Mesa
  @Output() public atualizarQuantidade:EventEmitter<string> = new EventEmitter()
  @Output() public exibirCarrinho:EventEmitter<string> = new EventEmitter()
  
  constructor(private carrinhoService:CarrinhoService,
    private produtoFilialService:ProdutoFilialService,
    private pedidoService:PedidoService) { }
    
    ngOnInit(): void {
      
      let pedido = this.carrinhoService.retornarPedido()
      
      this.produtoFilialService.recuperarProdutosFilialMemoria()
      .then((produtosRetorno:ProdutoFilial[]) => {
        
        this.produtosFilial = produtosRetorno
        
        if(pedido != undefined && pedido != null && pedido.itensPedido != undefined && pedido.itensPedido != null &&
          pedido.itensPedido.length > 0)
          {
            let itemLista:number = 0
            
            pedido.itensPedido.forEach((item:ItemPedido) => {
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
            
            this.atualizarQuantidade.emit(CONST_ATUALIZAR_QUANTIDADE)
            this.valorTotal = this.carrinhoService.retornarValorPedido()
          }           
        }
        
        public Incrementar(itemAtualizar:CarrinhoItem): void {
          
          let quantidade = this.carrinhoService.IncrementarQuantidade(itemAtualizar.identificador)
          
          let itemAtualizarPesquisado :CarrinhoItem =  this.carrinhoItens.find((item:CarrinhoItem) => item.identificador == itemAtualizar.identificador)
          
          if(itemAtualizarPesquisado != undefined && itemAtualizarPesquisado != null)
          {
            itemAtualizarPesquisado.quantidade = quantidade
            
            this.atualizarQuantidade.emit(CONST_ATUALIZAR_QUANTIDADE)
            this.valorTotal = this.carrinhoService.retornarValorPedido()
          } 
          
        }
        
        
        public executarExibirCarrinho():void {           
          this.exibirCarrinho.emit(CONST_EXIBIR_PRODUTOS)
        }
        
        public Decrementar(itemAtualizar:CarrinhoItem):void {
          
          let quantidade = this.carrinhoService.DecrementarQuantidade(itemAtualizar.identificador)
          
          let itemAtualizarPesquisado :CarrinhoItem =  this.carrinhoItens.find((item:CarrinhoItem) => item.identificador == itemAtualizar.identificador)
          
          if(itemAtualizarPesquisado != undefined && itemAtualizarPesquisado != null)
          {
            itemAtualizarPesquisado.quantidade = quantidade
            
            this.atualizarQuantidade.emit(CONST_ATUALIZAR_QUANTIDADE)
            this.valorTotal = this.carrinhoService.retornarValorPedido()
          } 
          
        }
        
        public realizarPedido():void {
          
          this.pedidoService.EnviarPedido(this.carrinhoService.retornarPedido())
          .subscribe((retorno:RetornoGenerico) => {
            if(retorno.codigo == CONST_SEM_ERROS)
            {
              this.carrinhoService.limparPedido()
              this.executarExibirCarrinho()
            }
          })
        }
      }
      