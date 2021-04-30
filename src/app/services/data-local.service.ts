import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular'
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  news: Article[] = [];
  private _storage: Storage | null = null;

  constructor(private storage: Storage,
              public toastController: ToastController
              ){
       this.init();
       this.LoadingFavorites();         
  }

  async presentToast(message){
    const toast = await this.toastController.create({
      message,
      duration:300
    });
    toast.present();
  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async saveNew(newP){

    const exist = this.news.find(findNew => findNew.title === newP.title);

    if(!exist){
      this.news.unshift(newP);
      this.storage.set('favorites',this.news);
    }
    
    this.presentToast('Agregado a favoritos');
    
  }

  async LoadingFavorites(){
    const result = await this.storage.get('favorites');

    if(result){
      this.news = result;
    }
  }

  deleteNew(newDelete){
    this.news = this.news.filter(filterNew => filterNew.title !== newDelete.title);
    this._storage.set('favorites',this.news); 
    this.presentToast('Eliminado de favoritos');
  }
}
