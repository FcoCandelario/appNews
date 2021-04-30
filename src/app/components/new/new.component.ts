import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

//uso del navegador web movil
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { ActionSheetController } from '@ionic/angular';
//Plugin social-sharing
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {


  @Input() new: Article;
  @Input() index: number;
  @Input() inFavorite;

  constructor(private iab:InAppBrowser,
              private actionSheetController: ActionSheetController,
              private socialSharing: SocialSharing,
              private dataLocalService : DataLocalService
              ) { }

  ngOnInit() {}

  openNew(){
    const browser = this.iab.create(this.new.url,'_system');
  }

  async options(){

    let saveDelBtn;

    if(this.inFavorite){
      saveDelBtn = {
        text: 'Borrar favorito',
        icon: 'trash',
        cssClass: 'actionSheet-dark',
        handler: () => {
          console.log('Borrar de favorito');
          this.dataLocalService.deleteNew(this.new);
        }
      };
    }else{
      saveDelBtn = {
        text: 'Favorito',
        icon: 'heart',
        cssClass: 'actionSheet-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.dataLocalService.saveNew(this.new);
        }
      };
    }

    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'actionSheet-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.new.title,
            this.new.source.name,
            '',
            this.new.url
          );
        }
      },
      saveDelBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'actionSheet-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);

  }

}
