import { BusStops } from './../bus-stops.model';
import { Employee } from './../Employee.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class BusStopService {
  constructor(private firestore: AngularFirestore) { }

  getBusStop() {
    return this.firestore.collection('busStops').snapshotChanges();
  }

  async createBusStop(BusStops: any) {
   var docRef =  await this.firestore.collection('busStops').add(BusStops);
   return docRef;
  }

  deleteBusStop(BusStops: BusStops) {
    return this.firestore.doc('busStops/' + BusStops.id).delete();
  }

  updateBusStop(BusStops: BusStops){
    
    return this.firestore.doc('busStops/' + BusStops.id).update(Employee)
}
}
