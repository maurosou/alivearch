import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, App, ToastController, Platform, ModalController, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import { BuildingPage } from '../building/building';
import { SearchPage } from '../search/search';
import { UrlProvider } from '../../providers/url/url';
declare var google: any;
declare var MarkerClusterer: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})


export class MapPage {
  @ViewChild('map') mapRef: ElementRef;
  map: any;
  markers = [];

  popup = false;

  lista = [];

  loading = this.loadingCtrl.create({
    spinner: 'ios'
  });

  registro = {
    nome_edificio : "",
    descricao : "",
    link_externo : ""
  }
  
  constructor( private toast : ToastController,
    public geo: Geolocation,  public http: Http,  public loadingCtrl: LoadingController, public modalCtrl: ModalController,
    public url:UrlProvider, public navCtrl: NavController, public app: App, public platform: Platform,
    public geolocation:Geolocation) {

      this.Carregar();
  }

  ionViewWillLoad(){
    
  }

  Carregar() {
    this.loading.present();
    this.http.get(this.url.edificio.lista)
    .map(res => res.json())
    .subscribe(res => {
      this.loading.dismiss();
      this.lista = res;
      
      this.MostrarMapa();
    });
  }

  MostrarMapa() {
    var context = this;
    this.geolocation.getCurrentPosition().then((resp) => {
      this.LimparMarker();
      let location = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      const options = {
        center: location,
        zoom: 4,
        streetViewControl: false,
        disableDefaultUI: true
      }

      this.map = new google.maps.Map(this.mapRef.nativeElement, options);

      var marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Você esta aqui',
        icon: "assets/imgs/markers/icone_voce.png"
      });

      console.log(this.lista);
      for(var i in this.lista)
      {
        let locationAgencia = new google.maps.LatLng(this.lista[i].latitude, this.lista[i].longitude);
        
        this.markers[i] = new google.maps.Marker({
          position: locationAgencia,
          map: this.map,
          icon: this.Icone(this.lista[i].subcategoria),
          registro: this.lista[i],
          numero:this.lista[i].id_edificio
        });

        console.log(this.lista[i]);

        this.markers[i].addListener('click', function(e) {
          context.AbrirInfo(this.registro)
        });

        
      }
      
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  AbrirInfo(registro) {
    this.registro = registro;
    this.popup = true;
  }

  LimparMarker() {
    for(var i in this.markers) {
      this.markers[i].setMap(null);
      console.log("Marcador:" + i);
    }
    this.markers = new Array();
  }

  Icone(c) {
    switch(Number(c)) {
      case 1:
        return "assets/imgs/markers/icone_predios.png";
      case 2:
        return "assets/imgs/markers/icone_monumentos.png";
      case 3:
        return "assets/imgs/markers/icone_pracas.png";
      default:
          return "assets/imgs/markers/icone_predios.png";
    }
  }

  FecharPopup() {
    this.popup = false;
  }

  AbrirLink() {
    window.open(this.registro.link_externo,'_system', 'location=yes');
  }
    
}