import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginI } from '../models/login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginCollection: AngularFirestoreCollection<LoginI>;
  private obj: Observable<LoginI[]>;
  constructor(db: AngularFirestore) {
    this.loginCollection = db.collection<LoginI>('loginMaster');
    this.obj = this.loginCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getLogin() {
    return this.obj;
  }

  chkUser(id: string) {
    return this.loginCollection.doc<LoginI>(id).valueChanges();
  }
}
