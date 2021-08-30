import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MatFormFieldModule, } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    MatButtonModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDH9Vu1yS8Yhb2LqPdFfunWAy1DxEOpIb4",
      authDomain: "shuttler-23bfb.firebaseapp.com",
      projectId: "shuttler-23bfb",
      storageBucket: "shuttler-23bfb.appspot.com",
      messagingSenderId: "901340732072",
      appId: "1:901340732072:web:58467d647f578dcff1c09d",
      measurementId: "G-QJJM3LJXZL"
    }),
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    AngularFireDatabaseModule,
    NgbModule,
    ToastrModule.forRoot(),
    MatDialogModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    WelcomeComponent,
    LoginComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
