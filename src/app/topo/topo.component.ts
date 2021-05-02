import { Mesa } from './../classes/mesa.model';
import { GrupoProduto } from './../classes/grupoProduto.model';
import { RetornoGenerico } from './../classes/respostaGenerico.model';
import { FilialService } from './../filial.service';
import { Component, Input, OnInit } from '@angular/core';
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
  
  constructor(private filialService:FilialService,
    private sanitizer: DomSanitizer) { }
    
    @Input() public filial:Filial
    @Input() public imageUrl:any    
    @Input() public gruposProdutos:GrupoProduto[]
    @Input() public mesa:Mesa

    ngOnInit(): void {
      
      console.log('passou aqui')
      console.log(this.filial)
      console.log(this.gruposProdutos)
      //this.filialService.RecuperarFilial('1')
      //.then((retorno:RetornoGenerico) => {
      //  this.filial = retorno.retorno
        //let uints = new Uint8Array(this.filial.empresa.logo);
        //let base64 = btoa(String.fromCharCode.apply(null,uints));
       //this.imageUrl = this.sanitizer.bypassSecurityTrustUrl ('data:image/jpg;base64,' + this.filial.empresa.logo);   
        
     // })

     
      
    }
    
  }
  