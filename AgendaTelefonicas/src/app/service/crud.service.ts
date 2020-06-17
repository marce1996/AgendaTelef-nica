import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(public fireservices:AngularFirestore) { }

  create(Record)
  {
    return this.fireservices.collection('Agenda').add(Record);
  }
}
