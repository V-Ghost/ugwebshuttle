import { Component, OnInit } from '@angular/core';
import { ShuttleServiceService } from 'app/services/shuttle-service.service';
import { Shuttle } from 'app/shuttle.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseAuthService } from 'app/services/firebase-auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  policies: Shuttle[] = [];

  profileForm = new FormGroup({
    model: new FormControl(''),
    seats: new FormControl(''),
    mileage: new FormControl(''),
  });
  hideCalender = false;
  temp: Shuttle;
  constructor(private policyService: ShuttleServiceService,private modalService: NgbModal,public authService: ShuttleServiceService,private toastr: ToastrService) { }
 
  ngOnInit() {
   this.policyService.getPolicies().subscribe(data => {
      this.policies = data.map(e => {
        let payload =  {
          id: e.payload.doc.id,
          ...e.payload.doc.data()as {}
        }

       

        payload["lastMaintenance"] =  payload["lastMaintenance"].toDate();
        
        return payload as Shuttle;
      })
     
    })
  }


  async delete(p: Shuttle){
   this.policyService.deletePolicy(p).then((result)=>{
    // console.log('success');
   }).catch((e)=>{
    console.log(e.message); 
   })
  }
  updateDOB(dateObject) {
   
    this.temp.lastMaintenance = dateObject.value
   
    this.toastr.info("Updating.....", 'Updating');
    this.authService.updatePolicy(this.temp).catch(error=>{
      this.toastr.error(error.message, 'Failed');
      console.log(error)
    });
    this.toastr.success("Updated Successfully", 'SUCCESS');
    // const stringified = JSON.stringify(dateObject.value);
   
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
      await this.authService.createPolicy(this.profileForm.value).catch(error=>{
        
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
