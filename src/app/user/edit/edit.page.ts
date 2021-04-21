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

// Usuário autenticado
import { AngularFireAuth } from '@angular/fire/auth';

// 6) Não permite somente espaços nos campos
export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}

// (*) Importa componentes de manipulação de rotas
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  // 3) Atributos
  public registerForm: FormGroup; // Contém o formulário de cadastro
  public pipe = new DatePipe('en_US'); // Formatar as datas
  
  // (*) Id do usuário logado
  public id: string; 

  // (*) Dados do usuário no database
  public userData: any; 

  constructor(

    // 2) Injeta dependências
    public form: FormBuilder,
    public afs: AngularFirestore,

    // Alert Controller
    public alert: AlertController,

    // Usuário autenticado
    public auth: AngularFireAuth,

    // (*) Manipula rotas
    private route: ActivatedRoute,
    private router: Router,
  ) {

    // (*) Obtém o id do usuário a ser exibido
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {

    // 4) Cria o formulário de contatos
    this.registerFormCreate();

    // (*) Preenche os campos a partir do database
    if (this.registerForm) {

      // Obtém cadastro do usuário do database
      this.afs.firestore.doc(`register/${this.id}`).get()
        .then((uData) => {

          // Se tem perfil
          if (uData.exists) {
            
            // Filtra dados do usuário no database
            this.userData = uData.data();

            // Insere dados do databse no formulário
            this.registerForm.controls.name.setValue(this.userData.name);
            this.registerForm.controls.email.setValue(this.userData.email);
            this.registerForm.controls.telephone.setValue(this.userData.telephone);
            this.registerForm.controls.whatsapp.setValue(this.userData.whatsapp);
            this.registerForm.controls.birth.setValue(this.userData.birth);
            this.registerForm.controls.cpf.setValue(this.userData.cpf);
            this.registerForm.controls.address.setValue(this.userData.address);
            this.registerForm.controls.gender.setValue(this.userData.gender);
            this.registerForm.controls.pwd.setValue(this.userData.pwd);
            this.registerForm.controls.uid.setValue(this.userData.uid);
          }
        });
    }
  }

  // 5) Cria o formulário de contatos
  registerFormCreate() {

    // 'registerForm' contém o formulário
    // Um formulário é um 'agrupamento' (group) de campos...
    this.registerForm = this.form.group({

      // Data de cadastro (date)
      // * Será gerada automaticamente pelo script
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
          Validators.pattern(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/),
          removeSpaces
        ]),
      ],

      // Campo 'Whatsapp' (whatsapp)
      whatsapp: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/),
          removeSpaces
        ]),
      ],

      // Campo data de nascimento (birth)
      birth: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/),
          removeSpaces
        ])
      ],

      // Campo CPF (cpf)
      cpf: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2})$/)
        ])
      ],

      // Campo sexo (gender)
      gender: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],

      // Campo endereço (address)
      address: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],

      // Campo PCD (pwd)
      pwd: [false],

      // Id do usuário logado (uid)
      uid: ['']

    });
  }

  // 7) Processa o envio do formulário]
  registerSend() {

    // Cria e formata a data
    this.registerForm.controls.date.setValue(
      this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss').trim()
    );

    // Salva em um novo documento do Firebase Firestore
    this.afs.collection('register').doc(this.registerForm.value.uid).set(this.registerForm.value)
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
      message: 'Cadastro atualizado com sucesso!',
      buttons: [{
        text: 'Ok',
        handler: () => {

          // Reset do formulário
          this.registerForm.reset();

          // Redireciona para profile
          this.router.navigate(['/user/profile']);
        }
      }]
    });

    await alert.present();
  }

}
