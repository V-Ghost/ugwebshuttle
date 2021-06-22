import { Employee } from './../Employee.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
  })

export class BusStops {
    constructor(private firestore: AngularFirestore) { }

    getEmployees() {
      return this.firestore.collection('busStops').snapshotChanges();
    }
  
    createEmployees(Employee: Employee) {
      return this.firestore.collection('busStops').add(Employee);
    }
  
    deleteEmployees(Employee: Employee) {
      return this.firestore.doc('busStops/' + Employee.id).delete();
    }
  
    updateEmployees(Employee: Employee){
      
      return this.firestore.doc('busStops/' + Employee.id).update(Employee)
  }
}
