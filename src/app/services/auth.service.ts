import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


   authStatus:boolean = false;
  constructor(private af:AngularFireAuth) {
    
   
  }

   public isAuthenticated(){
     return this.authStatus
   }

   public setAuthenticated(){
    this.authStatus = true;
  }

   


}
