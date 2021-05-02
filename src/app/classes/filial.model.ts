import { empresa } from './empresa.model';
export class Filial {

    constructor(public identificador:string,
                public codigo : string,
                public descricao:string,
                public trabalhaPorMesa: boolean,
                public solicitarTelefone: boolean,
                public empresa:empresa){}
}