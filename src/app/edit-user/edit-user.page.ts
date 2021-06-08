import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UtilService } from '../services/util.service';
import { Events } from '@ionic/angular';



@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  user: any;
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
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private util: UtilService,
    private event: Events
  ) { 

    

  }

  ngOnInit() {
    if (this.route.snapshot.data['special']) {
      this.user = this.route.snapshot.data['special'];
      this.createForm();
      this.loadPOC(); 
    }
   // if (this.user.role == "VOLUNTEER") {
     
    //}

  }

  createForm() {
    this.userForm = this.fb.group({
      emailid: [this.user.emailid, [Validators.required, Validators.email]],
      firstname: [this.user.firstname, [Validators.required]],
      lastname: [this.user.lastname, null],
      role: [this.user.role, [Validators.required]],
      mobilenumber: [this.user.mobilenumber, [Validators.required]],
      ngo: [this.user.ngo, null],
      addressline: [this.user.addressline, null],
      pincode: [this.user.pincode, null],
      landmark: [this.user.landmark, null],
      parentid: [this.user.parentid, null],

    });

  }

  loadPOC(){
    this.userService.searchUserByRole("POC").subscribe(poc => {
      this.pocs = poc;
    //  this.userForm.controls["parentid"].setValue(this.user.parentid,{onlySelf:true}); 
     
    })
    
  }


  


  resetFields() {

    this.createForm();
  }

  onSubmit(value) {
    if (this.userForm.valid) {
      value.id = this.user.id;
      this.userService.updateUser(value)
        .then(
          res => {
            this.util.presentAlert("User updated successfully", "Success Message", "User Update");
            this.event.publish("user:updated",this.user);
            this.router.navigateByUrl('/search-user');

          }
        ).catch(err =>{
          this.util.presentAlert(err.error.error.details);
        })
    }
  }

}
