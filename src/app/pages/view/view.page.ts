import { Component, OnInit } from '@angular/core';

// 1) Importa dependências
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  // 3) Atributos
  public item: Observable<any>;

  constructor(

    // 2) Injeta dependências
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {

    // 4) Obtém o id da rota
    this.route.params.subscribe(
      (data) => {
        if (data.id) {

          // Obtém documento do database
          this.item = this.firestore.doc<any>(`articles/${data.id}`).valueChanges();
        }
      }
    );
  }
}
