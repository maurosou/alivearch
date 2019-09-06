import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UrlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UrlProvider {

  padrao = "http://agenciacolateral.com.br/alivearch/api/";

  usuario = {
    logar: this.padrao + "conta/index",
    salvar: this.padrao + "conta/adicionar",
    esqueci: this.padrao + "conta/esqueci",
    novaSenha: this.padrao + "conta/novaSenha",
  }

  edificio = {
    lista: this.padrao + "edificio"
  }

  constructor(public http: HttpClient) {
    console.log('Hello UrlProvider Provider');
  }

}
