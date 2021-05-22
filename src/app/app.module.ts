import { ProdutoFilialService } from './produtoFilial.service';
import { CarrinhoService } from './carrinho.service';
import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { FilialService } from './filial.service';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { ProdutoComponent } from './produto/produto.component';
import { HomeComponent } from './home/home.component';
import { routerOptions } from './app.parametros';
import { RodapeComponent } from './rodape/rodape.component';
import { ProdutoItemComponent } from './produto-item/produto-item.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    MenuComponent,
    ProdutoComponent,
    HomeComponent,
    RodapeComponent,
    ProdutoItemComponent,
    CarrinhoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, routerOptions)
  ],
  providers: [FilialService,CarrinhoService, ProdutoFilialService],
  bootstrap: [AppComponent]
})
export class AppModule { }
