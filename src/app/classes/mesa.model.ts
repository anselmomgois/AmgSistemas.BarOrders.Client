import { MesaAtendente } from './mesaAtendente.model';
export class Mesa {

    constructor(public identificador:string,
                public codigo:string,
                public codigoEstado:string,
                public ativo:boolean,
                public mesasAtendentes:MesaAtendente[],
                public mesaAtendenteCorrente:MesaAtendente){}
}