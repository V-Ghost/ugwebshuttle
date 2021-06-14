import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Shuttle } from 'app/shuttle.model';
@Injectable({
  providedIn: 'root'
})
export class ShuttleServiceService {

  constructor(private firestore: AngularFirestore) { }

  getPolicies() {
    return this.firestore.collection('shuttles').snapshotChanges();
  }

  createPolicy(policy: Shuttle) {
    return this.firestore.collection('shuttles').add(policy);
  }

  deletePolicy(policyId: Shuttle) {
    return this.firestore.doc('shuttles/' + policyId.id).delete();
  }

  updatePolicy(policy: Shuttle){
    
    return this.firestore.doc('shuttles/' + policy.id).update(policy);
}
}