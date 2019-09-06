import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Http } from '@angular/http';
import { BuildingPage } from '../../pages/building/building';

@Component({
  selector: "page-favorites",
  templateUrl: "favorites.html"
})
export class FavoritesPage {
  favoritesArray: any;
  buildings: any;
  favArrayURL: any = "";
  hasFavorite = false;
  loading: any;

  constructor(
    public navCtrl: NavController,
    public favoriteProvider: FavoriteProvider,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public http: Http,
    public zone: NgZone,
    public modalCtrl: ModalController
  ) {}

  ionViewWillEnter() {
    this.loading = this.loadingCtrl.create({
      spinner: "ios"
    });
    this.loading.present();

    this.favoriteProvider.getAllFavoriteBuildings().then(result => {
      if (result) {
        this.favoritesArray = result;
      } else {
        this.loading.dismiss();
      }
      if (result && this.favoritesArray.length > 0) {
        this.hasFavorite = true;
        this.getFavorites();
      } else {
        this.loading.dismiss();
      }
    });
  }

  getFav() {
    console.log(this.favoriteProvider.getAllFavoriteBuildings());
    console.log(this.favoriteProvider.getAll());
    //this.favoritesArray = this.favoriteProvider.getAllFavoriteBuildings().__zone_symbol__value;
  }

  getFavorites = function(){
    this.favArrayURL = '';
    this.favoritesArray.forEach((fav) => {
      this.favArrayURL += 'favs[]='+fav+'&';
    });
    
    var promise = new Promise ((resolve, reject) => {
      var favURL = 'http://alivearchapp.com/viagemdearquiteto/api/favorites/read.php?'+ this.favArrayURL;  
      this.http.get(favURL)
      .subscribe((result : any) => {
        resolve(result.json());
        this.zone.run(() => {
          this.buildings = result.json().records;
        });
        this.loading.dismiss();
      },
      (error) => {
        reject(error.json());
      })    
    })
  }

  unfavoriteBuilding(cod) {
    this.favoriteProvider.unfavoriteBuilding(cod).then(() => {
      this.buildings.forEach(fav => {
        if (fav.codigo != cod) {
          return;
        } else {
          var index = this.buildings.indexOf(fav);
          this.buildings.splice(index, 1);
        }
      });
      var index = this.favoritesArray.indexOf(cod);
      this.favoritesArray.splice(index, 1);
      /**this.zone.run(() => {        
        //this.getFavorites();
      });*/
    });
  }

  openFavorite(cod) {
    console.log("Builing ID: " + cod);
    let myModal = this.modalCtrl.create(BuildingPage, { myParam: cod });
    myModal.onDidDismiss(data => {
      if (data) {
        this.unfavoriteBuilding(data);
      }
    });
    myModal.present();
  }
}
