export class ItemPedido {

    constructor(public identificadorItemComanda:string,
                public identificadorProdutoFilial:string,
                public quantidade:number,
                public valor:number){}
}