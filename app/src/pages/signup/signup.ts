import { Component } from '@angular/core';
import {  NavController, NavParams} from 'ionic-angular';
//import { TabsPage } from '../tabs/tabs';
import { WelcomePage } from '../welcome/welcome';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  responseData : any;
  userData = {"password": "", "email": ""};

  constructor( private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams ) {
  }

  async register(){
    try{
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.userData.email, this.userData.password);
      console.log(result);
      localStorage.setItem('userData', JSON.stringify(this.responseData));
      this.navCtrl.push(WelcomePage);
    }catch(e){
      console.error(e);
    }
  }

  login(){
    //Login page link
    this.navCtrl.push(WelcomePage);
  }

  welcome(){
    //Login page link
    this.navCtrl.push(WelcomePage);
  }
}