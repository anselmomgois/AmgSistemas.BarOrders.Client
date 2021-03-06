import { CarrinhoItem } from './classes/carrinhoItem.model';
import { ItemPedido } from './classes/itemPedido.model';
import { Pedido } from './classes/pedido.model';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class CarrinhoService {
    
    constructor(){}
    
    public pedido:Pedido
    
    public incluirItem(itemPedido:ItemPedido) {
        
        
        if (itemPedido.quantidade > 0)
        {
            if(this.pedido == undefined)
            {
                this.pedido = new Pedido(null,null,null,null,null);
                this.pedido.itensPedido = []
            }
            
            if(this.pedido.itensPedido != undefined && this.pedido.itensPedido != null && this.pedido.itensPedido.length > 0)
            {
                let itemPedidoPesquisado = this.pedido.itensPedido.find((item:ItemPedido) => item.identificadorProdutoFilial == itemPedido.identificadorProdutoFilial)
                if(itemPedidoPesquisado)
                {
                    itemPedidoPesquisado.quantidade += itemPedido.quantidade
                }
                else
                {
                    this.pedido.itensPedido.push(itemPedido)
                }
            }
            else
            {
                this.pedido.itensPedido.push(itemPedido)
            }
            
            localStorage.setItem('pedido',JSON.stringify(this.pedido))
        }
    }
    
    public retornarPedido():Pedido {
        
        if(this.pedido == undefined)
        {
            this.pedido = new Pedido(null,null,null,null,null);
            this.pedido.itensPedido = []
            
            if(localStorage.getItem('pedido') != null)
            {
                let pedido = localStorage.getItem('pedido')
                
                if(pedido.length > 0)
                {
                    this.pedido = JSON.parse(pedido)
                }
            }
        } 
        
        return this.pedido
    }
    
    public retornarQuantidade():number {
        let quantidade = 0
        
        if(this.pedido == undefined)
        {
            this.pedido = new Pedido(null,null,null,null,null);
            this.pedido.itensPedido = []
            
            if(localStorage.getItem('pedido') != null)
            {
                let pedido = localStorage.getItem('pedido')
                
                if(pedido.length > 0)
                {
                    this.pedido = JSON.parse(pedido)
                }
            }
        }  

        this.pedido.itensPedido.forEach((item:ItemPedido) => {
            quantidade += item.quantidade;
        })
        
        return quantidade
    }
    
    public retornarValorPedido():number {
        let valorPedido = 0
        
        if(this.pedido == undefined)
        {
            this.pedido = new Pedido(null,null,null,null,null);
            this.pedido.itensPedido = []
            
            if(localStorage.getItem('pedido') != null)
            {
                let pedido = localStorage.getItem('pedido')
                
                if(pedido.length > 0)
                {
                    this.pedido = JSON.parse(pedido)
                }
            }
        }       
        
        
        this.pedido.itensPedido.forEach((item:ItemPedido) => {
            valorPedido += item.quantidade * item.valor;
        })
        
        return valorPedido
    }
    
    public removerItemCarrinho(identificadorProdutoFilial:string):void
    {
        let itemRemover :ItemPedido =  this.pedido.itensPedido.find((item:ItemPedido) => item.identificadorProdutoFilial == identificadorProdutoFilial)
        
        if(itemRemover != undefined && itemRemover != null)
        {
            let index = this.pedido.itensPedido.indexOf(itemRemover)
            console.log(index)
            console.log(this.pedido)
            this.pedido.itensPedido.splice(index)
        }
        
        localStorage.setItem('pedido',JSON.stringify(this.pedido))
        console.log(this.pedido)
    }
    
    public IncrementarQuantidade(identificadorProdutoFilial:string):number {
        
        let quantidade:number = 0
        
        let itemAtualizar :ItemPedido =  this.pedido.itensPedido.find((item:ItemPedido) => item.identificadorProdutoFilial == identificadorProdutoFilial)
        
        if(itemAtualizar != undefined && itemAtualizar != null)
        {
            itemAtualizar.quantidade += 1
            quantidade = itemAtualizar.quantidade
        }
        
        localStorage.setItem('pedido',JSON.stringify(this.pedido))
        
        return quantidade
    }
    
    public DecrementarQuantidade(identificadorProdutoFilial:string):number {
        
        let quantidade:number = 0
        
        let itemAtualizar :ItemPedido =  this.pedido.itensPedido.find((item:ItemPedido) => item.identificadorProdutoFilial == identificadorProdutoFilial)
        
        if(itemAtualizar != undefined && itemAtualizar != null)
        {
            itemAtualizar.quantidade -= 1
            quantidade = itemAtualizar.quantidade
        }
        
        localStorage.setItem('pedido',JSON.stringify(this.pedido))
        
        return quantidade
    }

    public limparPedido():void {
        this.pedido = null;
        localStorage.removeItem('pedido')
    }
}