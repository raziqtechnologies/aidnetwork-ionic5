import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { User } from '../services/vos/user';
import { DataService } from '../services/data.service';
import { UtilService } from '../services/util.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import { AidareaService } from '../services/aidarea.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private currentuser:User;

  constructor(public areaService:AidareaService,public authService:AuthService,public util: UtilService, public dataservice: DataService, public afAuth: AngularFireAuth, private router: Router, private userService: UserService, private fire:AngularFirestore) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(authenticated => {
      if(authenticated != null)
      this.dataservice.getLocalData(authenticated.email).then(val =>{
        if(val != null)
        {
          this.currentuser = new User(val.firstname,val.lastname,val.emailid,val.role);
          this.authService.setAuthenticated();
        }
      });

      this.loadCaches();
   })
          
        
  
   
  
    
  }

  loadCaches(){
    //load pocs
    // this.userService.searchUserByRole("POC").subscribe(poc => {
    //   console.log("pocs loaded");
    //   this.dataservice.setData("POCS",poc);
    // })
   
    // this.areaService.getAllAreas().subscribe(area => {
    //   this.dataservice.setData("AREAS",area);
      
    // })
  }



  signOut() {
    this.afAuth.auth.signOut().then(() => {
    
      this.dataservice.clear();

    });
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {


    this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    this.userService.getUser(signInSuccessData.authResult.user.email).then(result => {
      
      if(result)
      {
        let userdata: any = result[0];

        if (userdata && (userdata.emailid == signInSuccessData.authResult.user.email)) {
          this.dataservice.setLocalData(this.afAuth.auth.currentUser.email, new User(userdata.firstname, userdata.lastname, userdata.emailid, userdata.role)).then(val => {
          
            this.router.navigateByUrl("/search-case");
            location.reload();
            this.authService.setAuthenticated();
          
          });
          
        }
        else {
          this.util.presentAlert("Please contact administrator admin@aidnetwork.com, you are not approved");
          this.signOut();
          
          this.afAuth.auth.currentUser.delete();
        

        }
      }
      else{
        this.util.presentAlert("Please contact administrator admin@aidnetwork.com, you are not approved");
        this.signOut();
        
        this.afAuth.auth.currentUser.delete();
      }



    }

    ).catch(err => {
      this.util.presentAlert("Please contact administrator admin@aidnetwork.com, you are not approved");
        this.signOut();
        
        this.afAuth.auth.currentUser.delete();
    });


  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    console.log(errorData);
  }

}
