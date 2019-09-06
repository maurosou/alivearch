import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { ScreenOrientation } from '@ionic-native/screen-orientation'; 
import { AngularFireAuth } from 'angularfire2/auth';
import { timer } from 'rxjs/observable/timer';
import { Globalization } from '../../node_modules/@ionic-native/globalization';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = WelcomePage;
  showSplash = true;
  language = "en-US";

  constructor(platform: Platform,  
    private translate: TranslateService, 
    private afAuth: AngularFireAuth,
     statusBar: StatusBar, 
     splashScreen: SplashScreen, 
     private globalization: Globalization,
     private screenOrientation: ScreenOrientation) {
      this.translate.addLangs(['en-US', 'pt-BR']);
      this.setLanguage();
      
      
      // this.afAuth.authState.subscribe(token => {
      //   if(!token){
      //     this.rootPage = WelcomePage;
      //   }
      //   else{
      //     this.rootPage = TabsPage;
      //   }
      // })
      this.rootPage = WelcomePage;
      // this.rootPage = TabsPage;
      if(platform.is('cordova')){
        platform.ready().then(()=>{
          this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        })
      }
      //translate.use('es');
      platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.hide();
      splashScreen.hide();

      timer(3000).subscribe(() => this.showSplash = false);

    });
  }

  setLanguage(){
    this.translate.setDefaultLang(this.language);
  }

  

}

