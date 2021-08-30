import { BusStops } from './../bus-stops.model';
import { Component, OnInit } from '@angular/core';

import { Shuttle } from 'app/shuttle.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseAuthService } from 'app/services/firebase-auth.service';
import { BusStopService } from 'app/services/bus-stop.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BusstopSelectComponent } from 'app/components/busstop-select/busstop-select.component';
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  policies: BusStops[] = [];
  busStop : BusStops;
  profileForm = new FormGroup({
    name: new FormControl(''),
   
  });
  hideCalender = false;
  temp: BusStops;
  constructor(private BusStopService: BusStopService,private modalService: NgbModal,private toastr: ToastrService,private router: Router) { 

  }
 
  ngOnInit() {
   this.BusStopService.getBusStop().subscribe(data => {
      this.policies = data.map(e => {
        let payload =  {
          id: e.payload.doc.id,
          ...e.payload.doc.data()as {}
        }

       

      
        
        return payload as BusStops;
      })
     
    })
  }


  async delete(p: BusStops){
   this.BusStopService.deleteBusStop(p).then((result)=>{
    // console.log('success');
   }).catch((e)=>{
    console.log(e.message); 
   })
  }
 
  edit(policy){
this.temp = policy;
  }
  async add(content){
    // console.log(this.profileForm.value);
   
    // if (!this.profileForm.value.mileage || !this.profileForm.value.seats  || !this.profileForm.value.model){
    //   this.toastr.error('Empty text field', 'Failed');
    // }else{
    //   this.modalService.dismissAll(content)
    //   this.toastr.info("Sending.....", 'Sending');
    
    //   await this.BusStopService.createBusStop(this.profileForm.value).catch(error=>{
        
    //     this.toastr.error(error.message, 'Failed');
       
    //   });
    //  this.toastr.success("Sent Successfully", 'SUCCESS');
      
     

    // }
  }

  goToBusstopSelect(content){
    console.log(this.profileForm.value.name)
    if(!this.profileForm.value.name){
      this.toastr.error('Empty text field', 'Failed');

    }else{
      console.log("bus-stop");
    this.modalService.dismissAll(content);
    this.router.navigate(["busstop-select", { name: this.profileForm.value.name } ] );
   
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
