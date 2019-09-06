import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NovaSenhaPage } from '../nova-senha/nova-senha';

/**
 * Generated class for the CodigoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-codigo',
  templateUrl: 'codigo.html',
})
export class CodigoPage {

  codigo = "";
  id_usuario;
  codigo_gerado;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id_usuario = this.navParams.get("id_usuario");
    this.codigo_gerado = this.navParams.get("codigo");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CodigoPage');
  }

  Validar() {
    if(this.codigo != "")
    {
      if(this.codigo == this.codigo_gerado) 
      {
        this.navCtrl.setRoot(NovaSenhaPage, { id_usuario: this.id_usuario})
      }
      else
      {
        alert("Código inválido")
      }
    }
  }

  Voltar() {
    this.navCtrl.pop();
  }

}
