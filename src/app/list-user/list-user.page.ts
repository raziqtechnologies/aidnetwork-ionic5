import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserVO } from '../services/models/uservo';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.page.html',
  styleUrls: ['./list-user.page.scss'],
})
export class ListUserPage implements OnInit {


  items:any;
  constructor( private userService: UserService,private router: Router) { 
      this.getData();

  }

  ngOnInit() {
  }

  getData(){
  
  }

  addUser(){

    this.router.navigate(['/add-users']);
  }

}
