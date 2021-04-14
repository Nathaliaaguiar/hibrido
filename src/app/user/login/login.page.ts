import { Component, OnInit } from '@angular/core';

// 1) Importa dependências
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // 3) Atributos

  constructor(

    // 2) Injeta dependências
    public auth: AngularFireAuth,
    private router: Router,
    public alert: AlertController
  ) { }

  ngOnInit() { }

  // 4) Método de login
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())

      // Se o login funcionar
      .then(
        (data: any) => {
          this.feedback(data.user.displayName)
        }
      )

      // Se o login falhar
      .catch(
        (error) => {
          console.log(error)
        }
      );
  }

  // 5) Feeback e saida da página
  async feedback(userName: string) {
    const alert = await this.alert.create({
      header: `Olá ${userName}!`,
      message: 'Você já pode acessar o conteúdo restrito.',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/articles']);
        }
      }]
    });

    await alert.present();
  }
}
