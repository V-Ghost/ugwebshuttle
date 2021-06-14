import { FirebaseAuthService } from './../services/firebase-auth.service';

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminLayoutComponent } from 'app/layouts/admin-layout/admin-layout.component';


@Component({
  selector: 'app-login',
  animations: [
    trigger('loadCompleted', [
      // ...
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0 })),
      transition('out => in',
        animate('600ms ease-out')
      ),

    ]),
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit   {
  loadCompleted = "out";
  show = false;
  hidden = false;
  autohide = true;
  errorMessage= "";
  buttonText = "Getting Started";
  success: String;
  isSignedin = false;
  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  inner = "inner";
  hide = true;
  constructor(public router: Router,public authService: FirebaseAuthService) {

  }

  ngOnInit(): void {
    if (localStorage.getItem("user") !== null) {
      this.isSignedin = true;
    } else {
      this.isSignedin = false;
    }
  }
  ngAfterViewInit() {

    setTimeout(() => { this.loadCompleted = "in" }, 1000)

  }

  async changeurl() {
    this.show= false;
    if (this.hidden == true) {
      console.log(this.profileForm.value);
      if (!this.profileForm.value.email || !this.profileForm.value.password) {
        this.errorMessage = "Textfield is empty";
          this.show = true;
          setTimeout(() => { this.show = false }, 5000)
      }else{
        console.log("it reach")
        await this.authService.signIn(this.profileForm.value.email, this.profileForm.value.password).catch(error=>{
          console.log(error.message);
          this.errorMessage = error.message;
          this.show = true;
          setTimeout(() => { this.show = false }, 5000)
        })
        if(this.authService.isLoggedIn){
          console.log("logged in successfully")
          this.router.navigate([''])
        }

        // AdminLayoutComponent
       
      }

    } else {
      this.hidden = true
      this.inner = "innerForm";
      this.success = "success";
      this.buttonText = "Login";
    }






  }

}
