import { ItemPedido } from './itemPedido.model';
export class Pedido {

    constructor(public identificadorComanda:string,
                public identificadorMesa:string,
                public identificadorMesaAtendente:string,
                public codigoComanda:string,
                public itensPedido:ItemPedido[]){}
}