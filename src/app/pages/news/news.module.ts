import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewsPageRoutingModule } from './news-routing.module';
import { NewsPage } from './news.page';

// 1) Importa Http Client do Angular
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsPageRoutingModule,

    // 2) Declara módulo Http Client
    HttpClientModule
  ],
  declarations: [NewsPage]
})
export class NewsPageModule {}
