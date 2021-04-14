import { Component, OnInit } from '@angular/core';

// 1) Importa dependências
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  // 3) Atributos

  // APIKey obtida de 'newsapi.org'
  private apiKey = '9e3095af5b5b4cbe90a32b48f480f973';

  // Palavra chave das buscas
  private apiQuery = 'furão';
  
  // Quantas notícias serão exibidas
  private apiItens = 10;

  // Endereço do request da API
  private apiURL = `https://newsapi.org/v2/everything?apiKey=${this.apiKey}&language=pt&q=${this.apiQuery}`;

  // Armazena as notícias para a 'view'
  public newsList: any;

  constructor(

    // 2) Injeta dependências
    private http: HttpClient
  ) { }

  ngOnInit() {

    // 4) Obtém as notícias da API REST (JSON) usando HTTP
    this.http.get(this.apiURL).subscribe(
      (data: any) => {

        // 5) Atribui notícias à 'view'
        this.newsList = data.articles.slice(0, this.apiItens);
      }
    )
  }

  // 6) Acessa site da notícia
  readNews(link: string) {
    window.open(link);
    return false;
  }
}
