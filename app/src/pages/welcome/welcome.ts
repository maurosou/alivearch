import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';
import { TutorialPage } from '../tutorial/tutorial';
import { CadastroPage } from '../cadastro/cadastro';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { UrlProvider } from '../../providers/url/url';
import { Http } from '@angular/http';
import { EsqueciPage } from '../esqueci/esqueci';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  loginForm: FormGroup;
  loginError: string;

  carregando = false;

  usuario = {
    email:"",
    senha:""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public gPlus: GooglePlus, private facebook: Facebook,
  public http:Http, public url:UrlProvider, public toastCtrl: ToastController,public translate: TranslateService) {

    
  }
  

  loginFacebookApp(){ 
    this.facebook.login(["email"])
  .then((res: FacebookLoginResponse) => {
    this.navCtrl.setRoot(TutorialPage);
  })
  .catch(e => {
    if(JSON.stringify(e).indexOf("1349195"))
    {
      this.navCtrl.setRoot(TutorialPage);
    }
  });
  }

  loginGoogle(){
    this.gPlus.login({
      'webClientId':'521144244038-vnp94iolok0be604bqmjr7btnhjbajp9.apps.googleusercontent.com',
      'offline':true
    }).then(res=>{
      this.navCtrl.setRoot(TutorialPage);
    }).catch(e => {
      if(e == 10)
      this.navCtrl.setRoot(TutorialPage);
    });
  }

  async novaConta(){
    this.navCtrl.push(CadastroPage); 
  }

  Esqueci() {
    this.navCtrl.push(EsqueciPage); 
  }

  Entrar() {
    
    if(this.Validar()) {
      this.carregando = true;
        this.http.post(this.url.usuario.logar, this.usuario)
        .map(res => res.json())
        .subscribe(res => {
          this.carregando = false;
          if(!res.erro) {
            this.navCtrl.setRoot(TutorialPage);
          } else {
            var toast = this.toastCtrl.create({
              message: res.mensagem,
              duration:3000,
              position:"bottom"
            });

            toast.present();
          }
          
            
        });

    } else {
      var toast = this.toastCtrl.create({
        message: "Preencha os campos",
        duration:3000,
        position:"bottom"
      });

      toast.present();
    }
  }

  Validar() {
      var valido = false;

      if(this.usuario.email != "" && this.usuario.senha != "")
          valido = true;

      return valido;
  }

}
