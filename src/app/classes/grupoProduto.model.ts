
export class GrupoProduto {

    constructor(public identificador:string,
                public codigo:string,
                public descricao:string,
                public gruposProdutos:GrupoProduto[]){}
}