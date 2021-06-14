

import { OnInit, AfterViewInit, ViewChild, Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseAuthService } from './../services/firebase-auth.service';

@Component({
  selector: 'app-welcome',
  // animations: [
  //   trigger('loadCompleted', [
  //     // ...
  //     state('in', style({ opacity: 1 })),
  //     state('out', style({ opacity: 0 })),
  //     transition('out => in',
  //       animate('600ms ease-out')
  //     ),

  //   ]),
  // ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit, AfterViewInit {
  // loadCompleted = "out";
  // show = true;
  // hidden = false;
  // hide = true;
  // buttonText = "Getting Started";
  // success: String;
  isSignedin = false;
  // profileForm = new FormGroup({
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  // });
  // inner = "inner";

  constructor(public router: Router, public authService: FirebaseAuthService) {

  }

  ngOnInit(): void {
    if (localStorage.getItem("user") !== null) {
      this.isSignedin = true;
    } else {
      this.isSignedin = false;
    }
  }
  ngAfterViewInit() {

   //setTimeout(() => { this.loadCompleted = "in" }, 1000)

  }

  // async changeurl() {
  //   if (this.hidden == true) {
  //     console.log(this.profileForm.value);
  //     if (!this.profileForm.value.email || !this.profileForm.value.password) {
  //       console.log("empty")
  //     } else {
  //       console.log("it reach")
  //       await this.authService.signIn(this.profileForm.value.email, this.profileForm.value.password).catch(error => {
  //         console.log(error.message)
  //       })
  //       if (this.authService.isLoggedIn) {
  //         console.log("logged in successfully")
  //       }

  //       //this.router.navigateByUrl('/login');
  //     }

  //   } else {
  //     this.hidden = true
  //     this.inner = "innerForm";
  //     this.success = "success";
  //     this.buttonText = "Login";
  //   }






  // }
}

