import { Component, NgZone } from '@angular/core';
import { IonicPage, ViewController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Geolocation } from '@ionic-native/geolocation';
import { FavoriteProvider } from '../../providers/favorite/favorite';


@IonicPage()
@Component({
  selector: 'page-building',
  templateUrl: 'building.html',
})
export class BuildingPage {

  myParam: any;
  buildingDetails: any;
  message: string = "Check out this building on AliveArchApp";
  link: string = null;
  file: string = null;
  subject: string = null;
  isFavorite = false;
  loading: any;
  latUser: any;
  lngUser: any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, 
    public http: Http, private socialSharing: SocialSharing, public platform: Platform,
    public geo: Geolocation,
    public favoriteProvider: FavoriteProvider,
    public zone: NgZone,
    public loadingCtrl: LoadingController) {
    this.myParam = navParams.get('myParam');
    this.favoriteProvider.isFavorite(this.myParam).then(isFav => {
      this.isFavorite = isFav;
    })
  }

  ionViewCanEnter() {
    var that = this;
    return new Promise ((resolve, reject) => {
      this.http.get('http://alivearchapp.com/viagemdearquiteto/api/buildings/read_one.php?id='+that.myParam)
      .subscribe((result : any) => {        
        this.buildingDetails = result.json();
        this.buildingDetails.nome = this.buildingDetails.nome.toUpperCase();
        resolve(result.json());
      },
      (error) => {
        reject(error.json());
      });
    });

  }

  swipeEvent(e) {
    if (e.direction == 2) {
        //direction 2 = right to left swipe.
    }
    this.dismiss();
  }
  
  favoriteBuilding() {
    this.favoriteProvider.favoriteBuilding(this.myParam).then(() => {
      this.zone.run(() => {
        this.isFavorite = true;
      });
    });
  }

  unfavoriteBuilding() {
    this.favoriteProvider.unfavoriteBuilding(this.myParam).then(() => {
      this.zone.run(() => {
        this.isFavorite = false;
      });
    });
  }

  share(){   
    
    this.loading = this.loadingCtrl.create({
      spinner: 'ios'
    });
    this.loading.present();
    
    setTimeout(() => {
      this.message = "Check out this building at Alive Arch " + this.buildingDetails.nome;
      this.file = "http://alivearchapp.com/viagemdearquiteto/painel/upload/edificio/" + this.buildingDetails.foto;
      this.link = "link do app na loja";
      this.socialSharing.share(this.message, this.subject, this.file, this.link)
      .then(()=>{
  
      }).catch(()=>{
  
      });
     }, 4000);
     this.loading.dismiss();
  }

  createRoute(){    
    this.loading = this.loadingCtrl.create({
      spinner: 'ios'
    });
    this.loading.present();
    setTimeout(() => {
      this.geo.getCurrentPosition().then((position) => {
        this.latUser = position.coords.latitude;
        this.lngUser = position.coords.longitude;
      });
  
        // ios
        if (this.platform.is('ios')) {
          window.open('maps://?q=' + this.buildingDetails.nome + '&saddr=' + this.latUser + ',' + this.lngUser + '&daddr=' + this.buildingDetails.latitude + ',' + this.buildingDetails.longitude, '_system');
          this.loading.dismiss();
        };
        // android
        if (this.platform.is('android')) {
          //window.open('https://www.google.com/maps/dir/' + this.latUser + ',' + this.lngUser + '/' + this.buildingDetails.latitude + ',' + this.buildingDetails.longitude);
          'geo://' + this.latUser + ',' + this.lngUser + '?q=' + this.buildingDetails.latitude + ',' + this.buildingDetails.longitude + '(' + this.buildingDetails.nome + ')', '_system'
        this.loading.dismiss();
        };
  
  }, 4000);
  this.loading.dismiss();
  }

  dismiss() {
    if (!this.isFavorite){
      this.viewCtrl.dismiss(this.buildingDetails.codigo);
    } else{
    this.viewCtrl.dismiss();
    }
  }
}
