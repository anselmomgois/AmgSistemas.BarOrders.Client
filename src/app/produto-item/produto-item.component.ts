import { ItemPedido } from './../classes/itemPedido.model';
import { CarrinhoService } from './../carrinho.service';
import { Mesa } from './../classes/mesa.model';
import { ProdutoFilial } from './../classes/produtoFilial.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-produto-item',
  templateUrl: './produto-item.component.html',
  styleUrls: ['./produto-item.component.css']
})
export class ProdutoItemComponent implements OnInit {
  
  @Input() public produtoFilial:ProdutoFilial
  @Input() public mesa:Mesa
  @Output() public enviarCarrinho:EventEmitter<string> = new EventEmitter()

  constructor(private carrinhoService:CarrinhoService) { }
  
  ngOnInit(): void {
  }
  
  public Incrementar(): void {
    
    this.produtoFilial.quantidadeSolicitada += 1;
    
  }
  
  public Decrementar():void {
    
    if (this.produtoFilial.quantidadeSolicitada > 0) {
      this.produtoFilial.quantidadeSolicitada -= 1;
    }
  }
  
  public AdicionarItem():void {
    
    let itemPedido:ItemPedido = new ItemPedido(null,this.produtoFilial.identificador, 
      this.produtoFilial.quantidadeSolicitada > 0 ? this.produtoFilial.quantidadeSolicitada : 1, this.produtoFilial.valor)
      
      this.carrinhoService.incluirItem(itemPedido)     
      this.enviarCarrinho.emit('PEDIDO_REALIZADO')                                  
    }
  }
  