import { CarrinhoService } from './carrinho.service';
import { Observable } from 'rxjs';
import { RetornoGenerico } from './classes/respostaGenerico.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Pedido } from './classes/pedido.model';

@Injectable()
export class PedidoService {


    constructor(private httpClient:HttpClient){}
    
    private readonly API = `${environment.API}/pedido`

    public EnviarPedido(pedido :Pedido): Observable<RetornoGenerico> {
        
        let headers = new HttpHeaders({
            "Content-Type":  "application/json"
        });
        let httpOptions = {
            headers: headers
        };
        console.log('passou aqui')
        
        return this.httpClient.post<RetornoGenerico>(this.API, 
                                    JSON.stringify(pedido), 
                                    httpOptions
                                    )
    }

}