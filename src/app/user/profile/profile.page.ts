import { Component, OnInit } from '@angular/core';

// 1) Importa
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(

    // 2) Injeta
    public auth: AngularFireAuth
  ) { }

  ngOnInit() { }

// 3) Abre perfil no Google
profile() {
  window.open('https://myaccount.google.com/');
  return false;
}


}
