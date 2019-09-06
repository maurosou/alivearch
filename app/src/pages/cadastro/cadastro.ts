import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
import { MapPage } from '../map/map';
import { Storage } from '@ionic/storage';
import { TutorialPage } from '../tutorial/tutorial';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  carregando = false;

  usuario = {
    email:"",
    senha:"",
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,  public storage: Storage, public http:Http, public url:UrlProvider, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  Voltar() {
    this.navCtrl.pop();
  }

  Salvar() {
    this.carregando = true;
    this.http.post(this.url.usuario.salvar, this.usuario)
    .map(res => res.json())
    .subscribe(res => {
      this.carregando = false;
      if(!res.erro) {
        alert("Cadastro concluído com sucesso");
        this.navCtrl.setRoot(TutorialPage);
      } else {
        alert(res.mensagem);
      }
    });
  }

}
