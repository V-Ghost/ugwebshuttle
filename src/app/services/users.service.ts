import { User } from './../user.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Shuttle } from 'app/shuttle.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: AngularFirestore) { }

  getUsers() {
    return this.firestore.collection('shuttleUsers').snapshotChanges();
  }

  createUsers(user: User) {
    return this.firestore.collection('shuttleUsers').add(user);
  }

  deleteUsers(user: User) {
    return this.firestore.doc('shuttleUsers/' + user.id).delete();
  }

  updateUsers(user: User){
    
    return this.firestore.doc('shuttleUsers/' + user.id).update(user);
}
}
