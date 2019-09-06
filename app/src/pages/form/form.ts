import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { InformationPage } from '../information/information';
import { AngularFireDatabase } from 'angularfire2/database';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { SelectSearch } from '../../components/select-search/select-search';
import { Architect } from '../../types/types';
import { Http } from '../../../node_modules/@angular/http';
import { PlacePage } from '../place/place';

@Component({
  selector: 'page-form',
  templateUrl: 'form.html'
})
export class FormPage {
  typeOptions: any;
  arrData = [];
  public photos : any;
  public base64Image : string;
  architects: Architect[];
  architect: Architect;
  architectOptions: any;
  response: any;

  data = {
    lat: '',
    lng: '',
    photo: '',
    buildingName: '',
    architect: '',
    architects: '',
    constructionYear: '',
    type: '',
    description: '',
    confirm: false 
  };
  loading: any;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    private fdb: AngularFireDatabase, private camera : Camera,
    private toast : ToastController,
    public loadingCtrl: LoadingController, public http: Http) {
      
    /**this.fdb.list("/myItems/").subscribe(_data =>{
      this.arrData = _data;
      console.log(this.arrData);
    });*/
    this.typeOptions = {
      title: 'Choose type'
      //subTitle: 'Select your favorite'
    };
  }

  ionViewWillLoad() {
    // Architect SearchBox
    this.getArchitects();
  }

  openInformationModal(){
    let myModal = this.modalCtrl.create(InformationPage);
    myModal.present();
  }

  openConfirmationModal(){
    let myModal = this.modalCtrl.create(InformationPage);
    myModal.onDidDismiss(data => {
      if(data){
        this.data.confirm = true;
      }
    })
    myModal.present();
  }

    //to open the search modal
  openMapModal(){
    let myModal = this.modalCtrl.create(PlacePage);
    myModal.onDidDismiss(data => {
      if(data){
        this.data.lat = data.lat();
        this.data.lng = data.lng();
        this.toast.create({
          message: "Location sent",
          duration: 3000,
          position: 'top'
        }).present();
      }
    })
    myModal.present();
  }

  takePhoto(){
    console.log("Take Photo");
    
    const options : CameraOptions = {
      quality: 75, // picture quality
      //destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI, 
      targetWidth: 1000,
      targetHeight: 1000,    
      correctOrientation: true
    };
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.photos.push(this.base64Image);
      this.photos.reverse();
      this.toast.create({
        message: "Photo sent",
        duration: 3000,
        position: 'top'
      }).present();
    }, (err) => {
      console.log(err);
    });
  }

  //get the buildings
  getArchitects(){
    this.loading = this.loadingCtrl.create({
      spinner: 'ios'
    });
    //this.loading.present();
    var promise = new Promise ((resolve, reject) => {
    this.http.get('http://alivearchapp.com/viagemdearquiteto/api/architects/read.php')
    .subscribe((result : any) => {
      console.log("Getting architects");
      resolve(result.json());
      this.architectOptions = result.json();
      console.log(this.architectOptions);

      let myArchitects = [];
      if (this.architectOptions.records.length > 0) {
        for (let i = 0; i < this.architectOptions.records.length; i++){
          myArchitects.push({
            id: this.architectOptions.records[i].codigo,
            name: this.architectOptions.records[i].nome
          });
        }
      }
      this.architects = this.passingFunction(myArchitects);
      this.loading.dismiss();
    },
    (error) => {
      reject(error.json());
    })  
  })
  .catch(e=>console.log(e));  
  }

  passingFunction(data:any): Architect[]{
    return data
  }

  architectChange(event: { component: SelectSearch, value: any }) {
    console.log('value:', event.value);
    let myArchitects = [];
    if(event.value.length > 0) {
      for(let i = 0; i < event.value.length; i++) {
        myArchitects.push({
          id: event.value[i].id
        });
      }
    } 
  console.log(myArchitects);
  }

  send(){
    this.data.architect = this.data.architects['0'].id;
    console.log(this.data);
    this.openConfirmationModal();
    if (this.data.confirm){
      this.uploadPhoto();
      var link = 'http://alivearchapp.com/viagemdearquiteto/api/buildings/create.php';
      this.http.post(link, this.data).subscribe(data=> {
        this.response = data['_body'];
        console.log(this.response);
        this.toast.create({
          message: "Building sent",
          duration: 3000,
          position: 'top'
        }).present();
      }, error => {
        console.log('error');
        this.toast.create({
          message: "Building not sent",
          duration: 3000,
          position: 'top'
        }).present();
      })
    } else {
      console.log("termo negado");
      this.toast.create({
        message: "Building not sent",
        duration: 3000,
        position: 'top'
      }).present();
    }
  }

  uploadPhoto(){
    var link = 'http://alivearchapp.com/viagemdearquiteto/api/photo/create.php';
    this.http.post(link, this.photos[0]).subscribe(data=>{
      this.response = data['_body'];
      console.log(this.response);
    }, error => {
      console.log('error');
    })
  }

  makePhotoName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 32; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  
}
