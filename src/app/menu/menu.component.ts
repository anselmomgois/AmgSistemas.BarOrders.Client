import { FilialService } from './../filial.service';
import { RetornoGenerico } from './../classes/respostaGenerico.model';
import { GrupoProduto } from './../classes/grupoProduto.model';
import { GrupoProdutoServices } from './../grupoProduto.services';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers:[GrupoProdutoServices]
})
export class MenuComponent implements OnInit {

  @Input() public gruposProdutos:GrupoProduto[]

  constructor() { }

  ngOnInit(): void {
   
  }

}
