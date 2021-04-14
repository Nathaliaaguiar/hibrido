import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// 1) Importa módulo do Firebase
import { AngularFireModule } from '@angular/fire';

// 2) Importa configuração do aplicativo
import { environment } from '../environments/environment';

// 4) Importa módulo do Firestore
import { AngularFirestoreModule } from '@angular/fire/firestore';

// 5) Importa módulo do Authentication
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,

    // 3) Incorporar módulo do Firebase
    AngularFireModule.initializeApp(environment.firebase),

    // 5) Incorporar módulo do Firestore
    AngularFirestoreModule,

    // 6) Incorpora módulo Authentication
    AngularFireAuthModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
