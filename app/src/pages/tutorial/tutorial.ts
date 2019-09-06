import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {Slides} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
  @ViewChild(Slides) slides:Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    console.log("tutorial");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }


  slideChanged(){
    let currentIndex = this.slides.getActiveIndex();
    if (currentIndex > 2) {
        this.navCtrl.setRoot(TabsPage);
    }
  }

}
