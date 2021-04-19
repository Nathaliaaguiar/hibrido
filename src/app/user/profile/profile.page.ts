import { Component, OnInit } from '@angular/core';

// 1) Importa
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  // Atributos
  private itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;

  constructor(

    // 2) Injeta
    public auth: AngularFireAuth,
    public afs: AngularFirestore
  ) { 

    this.auth.onAuthStateChanged(
      (userData) => {
        if (userData) {
          this.itemDoc = afs.doc<any>(`register/${userData.uid}`);
          this.item = this.itemDoc.valueChanges();
        }
      }
    );
  }

  ngOnInit() { }

  // 3) Abre perfil no Google
  profile() {
    window.open('https://myaccount.google.com/');
    return false;
  }

}
