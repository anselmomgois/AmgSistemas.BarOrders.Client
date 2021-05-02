import { Mesa } from './../classes/mesa.model';
import { ProdutoFilial } from './../classes/produtoFilial.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  @Input() public produtosFilial:ProdutoFilial[]
  @Input() public mesa:Mesa
  
  constructor() { }

  ngOnInit(): void {
  }

}
