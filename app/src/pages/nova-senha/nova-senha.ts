import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';

/**
 * Generated class for the NovaSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nova-senha',
  templateUrl: 'nova-senha.html',
})
export class NovaSenhaPage {

  carregando = false;
  senha = "";
  id_usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public url:UrlProvider) {
    this.id_usuario = this.navParams.get("id_usuario");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovaSenhaPage');
  }

  Voltar() {
    this.navCtrl.setRoot(WelcomePage);
  }

  Enviar() {
    if(this.senha.length > 2) {
      this.carregando = true;
      
      var usuario = {
        id:this.id_usuario,
        senha: this.senha
      }

      this.http.post(this.url.usuario.novaSenha, usuario)
      .map(res => res.json())
      .subscribe(res => {
          this.carregando = false;
          alert("Senha cadastrada com sucesso!")
          this.Voltar();
      });
    }
  }

}
