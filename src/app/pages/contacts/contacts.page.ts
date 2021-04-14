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
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  // 3) Atributos
  public contactForm: FormGroup; // Contém o formulário de contatos
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
    this.contactFormCreate();
  }

  // 5) Cria o formulário de contatos
  contactFormCreate() {

    // 'contactForm' contém o formulário
    // Um formulário é um 'agrupamento' (group) de campos...
    this.contactForm = this.form.group({

      // Data de envio está vazia
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

      // Campo 'Assunto' (subject)
      subject: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          removeSpaces
        ]),
      ],
      message: [
        // Mensagem
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          removeSpaces
        ]),
      ],
    });
  }

  // 7) Processa o envio do formulário]
  contactSend() {

    // Cria e formata a data
    this.contactForm.controls.date.setValue(
      this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss').trim()
    );

    // Salva em um novo documento do Firebase Firestore
    this.firestore.collection('contacts').add(this.contactForm.value)
      .then(
        () => {

          // Feedback
          this.presentAlert();
        }
      )
      .catch(

        // Exibe erro se não salvar
        (error) => {
          alert('Erro ao salvar contato.' + error);
        }
      );
  }

  // Feedback
  // Exibe feedback
  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Oba!',
      message: 'Contato enviado com sucesso!',
      buttons: [{
        text: 'Ok',
        handler: () => {
          
          // Reset do formulário
          this.contactForm.reset();
        }
      }]
    });

    await alert.present();
  }
}
