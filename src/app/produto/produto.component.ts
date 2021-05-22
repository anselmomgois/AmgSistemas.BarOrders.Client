import { ItemPedido } from './../classes/itemPedido.model';
import { Mesa } from './../classes/mesa.model';
import { ProdutoFilial } from './../classes/produtoFilial.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  @Input() public produtosFilial:ProdutoFilial[]
  @Input() public mesa:Mesa
  @Output() public enviarCarrinho:EventEmitter<string> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  public receberItemPedido(item:string)
  {
    this.enviarCarrinho.emit(item)
  }

 }
