import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContactsPageRoutingModule } from './contacts-routing.module';
import { ContactsPage } from './contacts.page';

// 1) Importa módulo de formulários reativos do Angular
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,  
    FormsModule,
    IonicModule,
    ContactsPageRoutingModule,

    // 2) Importa módulo
    ReactiveFormsModule
  ],
  declarations: [ContactsPage]
})
export class ContactsPageModule {}
