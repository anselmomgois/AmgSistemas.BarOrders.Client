import { GrupoProduto } from './../classes/grupoProduto.model';
import { RetornoGenerico } from './../classes/respostaGenerico.model';
import { FilialService } from './../filial.service';
import { Component, OnInit } from '@angular/core';
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
    private sanitizer: DomSanitizer,
    private grupoProdutoService:GrupoProdutoServices) { }
    
    public filial:Filial
    public imageUrl:any
    public gruposProdutos:GrupoProduto[]

    ngOnInit(): void {
      
      console.log('passou aqui')
      this.filialService.RecuperarFilial('1')
      .then((retorno:RetornoGenerico) => {
        this.filial = retorno.retorno
        //let uints = new Uint8Array(this.filial.empresa.logo);
        //let base64 = btoa(String.fromCharCode.apply(null,uints));
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl ('data:image/jpg;base64,' + this.filial.empresa.logo);       
        
        this.grupoProdutoService.RecuperarGruposProdutos(this.filial.empresa.identificador)
        .subscribe((retorno:RetornoGenerico) => {
         this.gruposProdutos = retorno.retorno;
         console.log(this.gruposProdutos)
        }, 
        (error:any) => {
          console.log(error)
        })
      })

     
      
    }
    
  }
  