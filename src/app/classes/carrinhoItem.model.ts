export class CarrinhoItem {
    
    constructor(public item:number,
        public identificador:string,
        public descricao:string,
        public quantidade:number,
        public valorUnitario:number,
        public valorTotal:number){}
    }