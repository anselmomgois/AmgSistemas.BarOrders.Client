export class ProdutoFilial {

    constructor(public identificador:string,
                public codigo: string,
                public descricao:string,
                public observacao:string,
                public imagem:any,
                public valor:number,
                public quantidade:number,
                public imageUrl:any,
                public identificadorGrupoProduto:string,
                public descricaoGrupoProduto:string,
                public bolExibirGrupoProduto:boolean,
                public quantidadeSolicitada:number){}
}