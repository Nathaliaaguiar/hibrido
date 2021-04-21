import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditPageRoutingModule } from './edit-routing.module';
import { EditPage } from './edit.page';

// 1) Importa módulo de formulários reativos do Angular
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPageRoutingModule,

    // 2) Importa módulo
    ReactiveFormsModule
  ],
  declarations: [EditPage]
})
export class EditPageModule { }
