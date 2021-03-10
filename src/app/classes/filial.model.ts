import { empresa } from './empresa.model';
export class Filial {

    constructor(public identificador:string,
                public codigo : string,
                public descricao:string,
                public empresa:empresa){}
}