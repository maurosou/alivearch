import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, App, ToastController, Platform, ModalController, LoadingController, ViewController } from 'ionic-angular';
//import { AngularFireAuth } from 'angularfire2/auth';
//import { WelcomePage } from '../welcome/welcome';
//import { FirebaseObjectObservable  } from 'angularfire2/database-deprecated';
//import { Profile } from '../../models/profile';
//import { Observable } from '@firebase/util';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
//import { BuildingPage } from '../building/building';
//import { SearchPage } from '../search/search';
//import { ReturnStatement } from '@angular/compiler';
//import { BuildingPage } from '../building/building';
//import { SearchPage } from '../search/search';

declare var google: any;


@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})


export class PlacePage {
  @ViewChild('map') mapRef: ElementRef;

  userLat: any;
  userLng: any;
  map : any;
  userDetails : any;
  responseData: any;
  buildings: any;
  codigo: any;
  architect: any;
  place: any;
  data = {
  lat: 0,
  lng: 0
  };
  iconSelf = {
    url: 'assets/imgs/markers/icone_voce.png',
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(25, 25)
  };

  loading = this.loadingCtrl.create({
    spinner: 'ios'
  });

  //start the markers
  markers = [];

  
  location = new google.maps.LatLng(40.730610, -73.935242);

  constructor(
    //private afDatabase: AngularFireDatabase,
    //private afAuth : AngularFireAuth, 
    private toast : ToastController,
    public geo: Geolocation, 
    public http: Http, 
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public navCtrl: NavController, public app: App, public platform: Platform
    ) {

  platform.ready().then(() => {
    //this.showMap();
  }); 

}

ionViewWillLoad(){
  
  this.loading.present();
  try{
    this.geo.getCurrentPosition().then( pos =>{
      this.userLat = pos.coords.latitude;
      this.userLng = pos.coords.longitude;
      this.location = new google.maps.LatLng(this.userLat, this.userLng);
      this.showMap();
    })
  }catch(e){
    console.error(e);
    //this.loading.dismiss();
  }
    
}

showMap(){
  //options
  const options = {
    center: this.location,
    zoom: 14, //5
    mapTypeControl: false,
    zoomControl: false,
    fullscreenControl: false,
    streetViewControl : false
  }  

  //bring map online
  this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  
  // THIS IS THE CENTER MAP
  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlUI.style.margin = '10px';

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '20px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '9px';
  controlText.style.paddingRight = '9px';
  controlText.innerHTML = '<i class="fas fa-crosshairs"></i>';
  controlUI.appendChild(controlText);

  this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlUI);

  // Setup the click event listeners: simply set the map where the person is.
  controlUI.addEventListener('click', () => {
    this.map.setCenter(this.location);
  });

  // Create a marker for  self location place  
  this.markers.push(new google.maps.Marker({
    map: this.map,
    icon: this.iconSelf,
    position: this.location
  }));

  // Marker to be draggable to choose position
  this.markers.push(new google.maps.Marker({
    position: this.location,
    map: this.map,
    draggable: true
  }));
  this.loading.dismiss();
}

close(){
  this.viewCtrl.dismiss(this.markers[1].getPosition());
}
cancel(){
  this.viewCtrl.dismiss();
}
/** to debug
check(){
  console.log(this.markers[1].getPosition());
}
 */

}
