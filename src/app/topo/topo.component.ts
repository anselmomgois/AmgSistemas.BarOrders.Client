import { RetornoGenerico } from './../classes/respostaGenerico.model';
import { FilialService } from './../filial.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Filial } from '../classes/filial.model';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css']
})
export class TopoComponent implements OnInit {

  constructor(private filialService:FilialService,
              private route:ActivatedRoute) { }

  public filial:Filial

  ngOnInit(): void {

    console.log('passou aqui')
    this.filialService.RecuperarFilial('1')
       .then((retorno:RetornoGenerico) => {
         this.filial = retorno.retorno
         console.log(this.filial)
       })
    
  }

}
