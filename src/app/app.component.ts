import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from './services/data.service';
import { User } from './services/vos/user';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  navigate: any;
  currentuser: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public afAuth: AngularFireAuth,
    private statusBar: StatusBar,
    private dataservice: DataService,
    private authservice: AuthService,
    private router: Router
  ) {
          this.initializeApp();
   

   
    
  }

  initializeApp() {

    
    this.afAuth.authState.subscribe(authenticated => {
      if(authenticated != null)
      {
        this.dataservice.getLocalData(authenticated.email).then(val => {
          if(val)
          {
            this.currentuser = new User(val.firstname, val.lastname, val.emailid, val.role);
            this.sideMenu();
            this.authservice.setAuthenticated();
          }
        });
      }
   
   

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    });
      
  }

  
  signOut() {
    this.afAuth.auth.signOut().then(val => {
      this.router.navigateByUrl('/');
      location.reload();
    });
  
  }


  sideMenu() {
    if (this.currentuser.isAdmin()) {
      this.navigate =
      [
        {
          title: "Home",
          url: "/home",
          icon: "home"
        },
        {
          title: "Search Cases",
          url: "/search-case",
          icon: "search"
        },
        {
          title: "Search Area",
          url: "/search-area",
          icon: "search"
        },
        {
          title: "Add Area",
          url: "/add-aidarea",
          icon: "add"
        },
        {
          title: "Search User",
          url: "/search-user",
          icon: "search"
        },
        {
          title: "Add User",
          url: "/add-users",
          icon: "add"
        },
      

      ]
    }
    else if(this.currentuser.isOperator()) {
      this.navigate =
        [
          {
            title: "Home",
            url: "/home",
            icon: "home"
          },
          {
            title: "Search Cases",
            url: "/search-case",
            icon: "search"
          },
          {
            title: "Add Case",
            url: "/add-case",
            icon: "add"
          },


        ]
    }
    else{
      this.navigate =
      [
        {
          title: "Home",
          url: "/home",
          icon: "home"
        },
        {
          title: "Search Cases",
          url: "/search-case",
          icon: "search"
        },
      ]
    }
  }
}
