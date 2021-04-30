import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

//Plugin para abrir enlaces en el navegador web movil
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

//Plugin social-sharing
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

//Peticiones HHTP
import {HttpClientModule} from '@angular/common/http';

//ionic-storage
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(),
            AppRoutingModule,
            HttpClientModule,
            IonicStorageModule.forRoot()
          ],
  providers: [
              InAppBrowser,
              SocialSharing,
              { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
            ],
  bootstrap: [AppComponent],
})
export class AppModule {}
