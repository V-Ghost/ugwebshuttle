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
    policy.latitude = "5.6363897209761005";
    policy.longitude = "-0.18836554383137324";
    policy.speed = "0";
    return this.firestore.collection('shuttles').doc(policy.id).set(policy)
  }

  deletePolicy(policyId: Shuttle) {
    return this.firestore.doc('shuttles/' + policyId.id).delete();
  }

  updatePolicy(policy: Shuttle){
   
    return this.firestore.doc('shuttles/' + policy.id).update(policy);
}
}
