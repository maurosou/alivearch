import { Component } from '@angular/core';

import { FavoritesPage } from '../favorites/favorites';
import { FormPage } from '../form/form';
import { MapPage } from '../map/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { NewsPage } from '../news/news';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapPage;
  tab2Root = FavoritesPage;
  tab3Root = NewsPage;
  tab4Root = FormPage;


  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController,
    public navParams: NavParams, private toast: ToastController) {

  }
  ionViewDidLoad() {
    // this.afAuth.authState.subscribe(data=> {
    //   if(data && data.email && data.uid){
    //     //console.log(data);
    //   } else {
    //     this.toast.create({
    //       message: "Could not find user",
    //       duration: 3000
    //     }).present();
    //     this.navCtrl.setRoot(WelcomePage);                
    //   }      
    // });
  }
}
