import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UrlProvider } from '../../providers/url/url';
import { Http } from '@angular/http';
import { CodigoPage } from '../codigo/codigo';

/**
 * Generated class for the EsqueciPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-esqueci',
  templateUrl: 'esqueci.html',
})
export class EsqueciPage {

  carregando = false;
  usuario = {
    email:""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public url:UrlProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EsqueciPage');
  }

  Voltar() {
    this.navCtrl.pop();
  }

  Enviar() {
    if(this.usuario.email != "") {
      this.carregando = true;
      this.http.post(this.url.usuario.esqueci, this.usuario)
      .map(res => res.json())
      .subscribe(res => {
          this.carregando = false;
          if(!res.erro) {
              alert(res.mensagem);
              this.navCtrl.setRoot(CodigoPage, res)
          } else {
            alert(res.mensagem);
          }
      });
    }
    
  }

}
