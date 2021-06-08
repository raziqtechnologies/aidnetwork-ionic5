import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { UserService } from '../services/user.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {



  userForm: FormGroup;
  pocs: any;


  validation_messages = {
    'emailid': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Invalid Email Id.' },
    ],
    'firstname': [
      { type: 'required', message: 'Firstname is required.' },
    ],
    'role': [
      { type: 'required', message: 'Role is required.' },
    ],
    'mobilenumber': [
      { type: 'required', message: 'Mobile Number is required.' },
      { type: 'pattern', message: 'Mobile Number is invalid.' },
    ],


  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.createForm();
    this.userService.searchUserByRole("POC").subscribe(poc => {
      this.pocs = poc;
     
    })
  }

  createForm() {
    this.userForm = this.fb.group({
      emailid: [null, [Validators.required, Validators.email]],
      firstname: [null, [Validators.required]],
      lastname: [null, null],
      role: [null, [Validators.required]],
      mobilenumber: [null, [Validators.required]],
      ngo: [null, null],
      addressline: [null, null],
      pincode: [null, null],
      landmark: [null, null],
      parentid: [null, null],

    });

  }
 




  resetFields() {

    this.createForm();
  }

  onSubmit(value) {
    if (this.userForm.valid) {
      this.userService.addUser(value)
        .then(
          res => {
            this.util.presentAlert("User added successfully","Success Message","User Addition");
            this.resetFields();
            
          }
        ).catch(err =>{
          this.util.presentAlert(err.error.error.details);
        })
    }
  }

}
