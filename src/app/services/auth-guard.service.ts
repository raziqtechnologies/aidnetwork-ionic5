import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { DataService } from "./data.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "./vos/user";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {

  private currentuser:User;
  constructor(private router: Router,private dataservice:DataService,public afAuth: AngularFireAuth,public authService:AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (!this.authService.isAuthenticated()) {
        this.router.navigate(["login"]);
        return false;
    }
    else{
      this.dataservice.getLocalData(this.afAuth.auth.currentUser.email).then(val => {
        this.currentuser = new User(val.firstname,val.lastname,val.emailid,val.role);
        if(this.currentuser.isAdmin())
        {
          
        }
      }); 
      return true;
    }

   
  }

 
}