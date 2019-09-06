import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { FavoritesPage } from '../pages/favorites/favorites';
import { FormPage } from '../pages/form/form';
import { MapPage } from '../pages/map/map';
import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { SignupPage } from '../pages/signup/signup';
import { InformationPage } from '../pages/information/information';
import { BuildingPage } from '../pages/building/building';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SearchPage } from '../pages/search/search';
import { NewsPage } from '../pages/news/news';
import { NewsDetailPage } from '../pages/news-detail/news-detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
// import { HttpModule, Http } from "@angular/http";
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Camera } from '@ionic-native/camera';

import { SelectSearch } from '../components/select-search/select-search';
import { SelectSearchPage } from '../components/select-search/select-search-page';
import { FavoriteProvider } from '../providers/favorite/favorite';
import { IonicStorageModule } from '@ionic/storage';
import { PlacePage } from '../pages/place/place';
import { Globalization } from '../../node_modules/@ionic-native/globalization';
import { NewsProvider } from '../providers/news/news';
import { UrlProvider } from '../providers/url/url';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { NovaSenhaPage } from '../pages/nova-senha/nova-senha';
import { EsqueciPage } from '../pages/esqueci/esqueci';
import { CodigoPage } from '../pages/codigo/codigo';
 

firebase.initializeApp({    
  apiKey: "AIzaSyDztxJxETKWZkz7EMBxtSVrxgy2gwdgRDM",
  authDomain: "alivearchusers.firebaseapp.com",
  databaseURL: "https://alivearchusers.firebaseio.com",
  projectId: "alivearchusers",
  storageBucket: "alivearchusers.appspot.com",
  messagingSenderId: "521144244038"
});

@NgModule({
  declarations: [
    MyApp,
    FavoritesPage,
    FormPage,
    MapPage,
    TabsPage,
    WelcomePage,
    SignupPage,
    InformationPage,
    BuildingPage,
    TutorialPage,
    SearchPage,
    SelectSearch,
    SelectSearchPage,
    PlacePage,
    NewsPage,
    NewsDetailPage,
    CadastroPage,
    NovaSenhaPage,
    EsqueciPage,
    CodigoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    HttpClientModule,
    HttpModule,
    //Http,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FavoritesPage,
    FormPage,
    MapPage,
    TabsPage,
    WelcomePage,
    SignupPage,
    InformationPage,
    BuildingPage,
    TutorialPage,
    SearchPage,
    SelectSearch,
    SelectSearchPage,
    PlacePage,
    NewsPage,
    NewsDetailPage,
    CadastroPage,
    NovaSenhaPage,
    EsqueciPage,
    CodigoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    GooglePlus,
    Geolocation,
    ScreenOrientation,
    SocialSharing,
    Camera,
    Globalization,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FavoriteProvider,
    NewsProvider,
    UrlProvider
  ]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
