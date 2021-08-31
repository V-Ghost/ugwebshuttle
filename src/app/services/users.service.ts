import { User } from './../user.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Shuttle } from 'app/shuttle.model';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: AngularFirestore,public firebaseAuth : AngularFireAuth) { }

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
