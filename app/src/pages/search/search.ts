import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, LoadingController } from 'ionic-angular';
import { Architect } from '../../types/types';
import { Http } from '@angular/http';
import { SelectSearch } from '../../components/select-search/select-search';
import { Category } from '../../types/types';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  @ViewChild('pac-input') mapRef: ElementRef;
  input: any;
  searchBox: any;
  data = {
    place :'',
    architect :'',
    category: '',
    fromYear: '',
    toYear: '',
  };
  myArchitects: any;
  architects: Architect[];
  architect: Architect;
  myCategories: any;
  categories: Category[];
  category: Category;

  architectOptions:any;
  categoryOptions:any;
  loading: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public platform: Platform,    
    public loadingCtrl: LoadingController,
    public http: Http) {

  }
  ionViewWillEnter() {
 // Places SearchBox 
    var search = document.getElementById('place');
    var searchBox = new google.maps.places.SearchBox(search);
 
    // https://stackoverflow.com/questions/30383097/pass-typescript-property-from-outside-scope-into-scope
    searchBox.addListener('places_changed', () => {
      this.data.place = searchBox.getPlaces();
    });
  }
  ionViewWillLoad() {

   

    // Architect SearchBox
    this.getArchitects();
    // categoies searchbox
    this.getCategories();
  }

  search() {
    if (this.data){
    this.viewCtrl.dismiss(this.data);
  }   else{
    this.viewCtrl.dismiss();
  }
  }

  selectAll(){
    this.data.architect = '';
    this.data.fromYear == '';
    this.data.toYear == '';
    this.search();
  }

  //get the archs
  getArchitects(){
    this.loading = this.loadingCtrl.create({
      spinner: 'ios'
    });
    this.loading.present();
    var promise = new Promise ((resolve, reject) => {
    this.http.get('http://alivearchapp.com/viagemdearquiteto/api/architects/read.php')
    .subscribe((result : any) => {
      console.log("Getting architects");
      resolve(result.json());
      this.architectOptions = result.json();
      console.log(this.architectOptions);

      this.myArchitects = [];
      if (this.architectOptions.records.length > 0) {
        for (let i = 0; i < this.architectOptions.records.length; i++){
          this.myArchitects.push({
            id: this.architectOptions.records[i].codigo,
            name: this.architectOptions.records[i].nome
          });
        }
      }
      this.architects = this.passingFunctionArc(this.myArchitects);
      this.loading.dismiss();
    },
    (error) => {
      reject(error.json());
    })    
  })
  .catch(e=>console.log(e));  
  }

  getCategories(){

    var promise = new Promise ((resolve, reject) => {
    this.http.get('http://alivearchapp.com/viagemdearquiteto/api/categories/read.php')
    .subscribe((result : any) => {
      console.log("Getting categories");
      resolve(result.json());
      this.categoryOptions = result.json();
      console.log(this.categoryOptions);

      this.myCategories = [];
      if (this.categoryOptions.records.length > 0) {
        for (let i = 0; i < this.categoryOptions.records.length; i++){
          this.myCategories.push({
            id: this.categoryOptions.records[i].codigo,
            name: this.categoryOptions.records[i].nome
          });
        }
      }
      this.categories = this.passingFunctionCat(this.myCategories);

    },
    (error) => {
      reject(error.json());
    })    
  })
  .catch(e=>console.log(e)); 
  }

  passingFunctionArc(data:any): Architect[]{
    return data
  }
  passingFunctionCat(data:any): Category[]{
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

  categoryChange(event: { component: SelectSearch, value: any }) {
    console.log('value:', event.value);
    let myCategories = [];
    if(event.value.length > 0) {
      for(let i = 0; i < event.value.length; i++) {
        myCategories.push({
          id: event.value[i].id
        });
      }
    } 
  console.log(myCategories);
  }
 
  
}
