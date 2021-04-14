import { Component, OnInit } from '@angular/core';

// 1) Importa dependências
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';

// Alert Controller
import { AlertController } from '@ionic/angular';

// 6) Não permite somente espaços nos campos
export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  // 3) Atributos
  public registerForm: FormGroup; // Contém o formulário de cadastro
  public pipe = new DatePipe('en_US'); // Formatar as datas

  constructor(
    // 2) Injeta dependências
    public form: FormBuilder,
    public firestore: AngularFirestore,

    // Alert Controller
    public alert: AlertController
  ) { }

  ngOnInit() {
    // 4) Cria o formulário de contatos
    this.registerFormCreate();
  }

  // 5) Cria o formulário de contatos
  registerFormCreate() {

    // 'contactForm' contém o formulário
    // Um formulário é um 'agrupamento' (group) de campos...
    this.registerForm = this.form.group({

      // Data de cadastro está vazia
      date: [''],

      // Campo 'Nome' (name)
      name: [
        '', // Valor inicial
        Validators.compose([ // Validação do campo
          Validators.required, // Obrigatório
          Validators.minLength(3), // Pelo menos 3 caracteres
          removeSpaces // Não permite somente espaços
        ]),
      ],

      // Campo 'E-mail' (email)
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email, // Valida somente se for um e-mail válido
          removeSpaces
        ]),
      ],

      // Campo 'Telefone' (telephone)
      telephone: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/g),
          removeSpaces
        ]),
      ],

      whatsapp: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/g),
          removeSpaces
        ]),
      ],

      birth: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern("\d{2}/\d{2}/\d{4}"),
          removeSpaces
        ])
      ],

      cpf: [
        ''
      ],

      gender: [
        ''
      ],

      address: [
        ''
      ],

      pwd: [
        ''
      ]

    });
  }

  // 7) Processa o envio do formulário]
  contactSend() {

    // Cria e formata a data
    this.registerForm.controls.date.setValue(
      this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss').trim()
    );

    // Salva em um novo documento do Firebase Firestore
    this.firestore.collection('register').add(this.registerForm.value)
      .then(
        () => {

          // Feedback
          this.presentAlert();
        }
      )
      .catch(

        // Exibe erro se não salvar
        (error) => {
          alert('Erro ao cadastrar.' + error);
        }
      );
  }

  // Feedback
  // Exibe feedback
  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Oba!',
      message: 'Cadastro realizado com sucesso!',
      buttons: [{
        text: 'Ok',
        handler: () => {

          // Reset do formulário
          this.registerForm.reset();
        }
      }]
    });

    await alert.present();
  }
}
