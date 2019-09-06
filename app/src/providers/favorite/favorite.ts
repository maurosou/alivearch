import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
 
const STORAGE_KEY = 'favoriteBuildings';
 
@Injectable()
export class FavoriteProvider {
 
  constructor(public storage: Storage) { }
 
  public isFavorite(buildingId) {
    return this.getAllFavoriteBuildings().then(result => {
      return result && result.indexOf(buildingId) !== -1;
    });
  }
 
  public favoriteBuilding(buildingId) {
    return this.getAllFavoriteBuildings().then(result => {
      if (result) {
        result.push(buildingId);
        return this.storage.set(STORAGE_KEY, result);
      } else {
        return this.storage.set(STORAGE_KEY, [buildingId]);
      }
    });
  }
 
  public unfavoriteBuilding(buildingId) {
    return this.getAllFavoriteBuildings().then(result => {
      if (result) {
        var index = result.indexOf(buildingId);
        result.splice(index, 1);
        return this.storage.set(STORAGE_KEY, result);
      }
    });
  }
 
  public getAllFavoriteBuildings() {
    return this.storage.get(STORAGE_KEY);
  }

  public getAll(){
   
 
    let contacts: FavoriteList[] = [];
 
    return this.storage.forEach((value: Favorite, key: string, iterationNumber: Number) => {
      let contact = new FavoriteList();
      contact.key = key;
      contact.favorite = value;
      contacts.push(contact);
    })
      .then(() => {
        return Promise.resolve(contacts);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
  
 
}
export class Favorite {
  codigo: number;
  //nome: string;
  //foto: string;
}
export class FavoriteList {
  key: string;
  favorite: Favorite;
}