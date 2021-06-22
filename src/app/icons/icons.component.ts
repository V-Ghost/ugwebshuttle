import { Employee } from './../Employee.model';
import { EmployeesService } from 'app/services/Employees.service';
import { Component, OnInit } from '@angular/core';

import { Shuttle } from 'app/shuttle.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseAuthService } from 'app/services/firebase-auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  policies: Employee[] = [];

  profileForm = new FormGroup({
    model: new FormControl(''),
    seats: new FormControl(''),
    mileage: new FormControl(''),
  });
  hideCalender = false;
  temp: Employee;
  constructor(private policyService: EmployeesService,private modalService: NgbModal,public authService: EmployeesService,private toastr: ToastrService) { }
 
  ngOnInit() {
   this.policyService.getEmployees().subscribe(data => {
      this.policies = data.map(e => {
        let payload =  {
          id: e.payload.doc.id,
          ...e.payload.doc.data()as {}
        }

       

      
        
        return payload as Employee;
      })
     
    })
  }


  async delete(p: Employee){
   this.policyService.deleteEmployees(p).then((result)=>{
    // console.log('success');
   }).catch((e)=>{
    console.log(e.message); 
   })
  }
 
  edit(policy){
this.temp = policy;
  }
  async add(content){
    console.log(this.profileForm.value);
   
    if (!this.profileForm.value.mileage || !this.profileForm.value.seats  || !this.profileForm.value.model){
      this.toastr.error('Empty text field', 'Failed');
    }else{
      this.modalService.dismissAll(content)
      this.toastr.info("Sending.....", 'Sending');
     this.profileForm.value["lastMaintenance"] = new Date(); 
      await this.authService.createEmployees(this.profileForm.value).catch(error=>{
        
        this.toastr.error(error.message, 'Failed');
       
      });
      this.toastr.success("Sent Successfully", 'SUCCESS');
      // await this.authService.signIn(this.profileForm.value.email, this.profileForm.value.password).catch(error=>{
      //   console.log(error.message);
      //   this.errorMessage = error.message;
      //   this.show = true;
      //   setTimeout(() => { this.show = false }, 5000)
      // })
     

    }
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
