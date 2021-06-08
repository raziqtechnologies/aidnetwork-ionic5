import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Router, Params } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';
import { AlertController } from '@ionic/angular';
import { UtilService } from '../services/util.service';
import { DataService } from '../services/data.service';
import { User } from '../services/vos/user';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  hasVerifiedEmail = true;
  sentTimestamp;
  currentuser: User;
  isAdmin: boolean;
  isOperator: boolean;
  isPOC: boolean;
  isVolunteer: boolean;


  constructor(public dataservice: DataService, public afAuth: AngularFireAuth,private router: Router,private firebaseService:FirebaseService,private alertController: AlertController,private util: UtilService) {

    this.dataservice.getLocalData(this.afAuth.auth.currentUser.email).then(val =>{
      
      this.currentuser = new User(val.firstname,val.lastname,val.emailid,val.role);
    });

  }


  sendVerificationEmail() {
    this.afAuth.auth.currentUser.sendEmailVerification();
    this.sentTimestamp = new Date();
  }

  reload() {
    window.location.reload();
  }

  addUser(){

    this.router.navigate(['/list-users']);
  }


  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'UnAuthorized User',
      message: 'Please contact our admin get registered.',
      buttons: ['OK'],
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
 
  

  importAreas()
  {
    this.util.exportJSONDocument();
    console.log("All Areas Imported");
  }
}
