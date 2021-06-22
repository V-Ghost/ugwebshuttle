import { Employee } from './../Employee.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  constructor(private firestore: AngularFirestore) { }

  getEmployees() {
    return this.firestore.collection('employees').snapshotChanges();
  }

  createEmployees(Employee: Employee) {
    return this.firestore.collection('employees').add(Employee);
  }

  deleteEmployees(Employee: Employee) {
    return this.firestore.doc('employees/' + Employee.id).delete();
  }

  updateEmployees(Employee: Employee){
    
    return this.firestore.doc('employees/' + Employee.id).update(Employee)
}
}
