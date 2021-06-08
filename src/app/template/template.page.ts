import { Component, OnInit } from '@angular/core';
import { ControlsService } from '../dynamicform/controls.service';
import { FormGroup } from '@angular/forms';
import { ControlBase } from '../dynamicform/control-base';
import { Router, ActivatedRoute } from '@angular/router';
import { of,from } from 'rxjs';
import { AlertController, Events, NavController } from '@ionic/angular';

@Component({
  selector: 'app-template',
  templateUrl: './template.page.html',
  styleUrls: ['./template.page.scss'],
})
export class TemplatePage implements OnInit {
  controls: ControlBase<any>[];
  form: FormGroup;
  category:any;
  submitted: any;
  template:any;

  constructor(private navController: NavController,private event: Events,public alertCtrl: AlertController,public controlsService: ControlsService, private router: Router, private route: ActivatedRoute) { 

    this.form = new FormGroup({});
  }

  ngOnInit() {

    if (this.route.snapshot.data['special']) 
    {
      
      
      this.category = this.route.snapshot.data['special'];
      let data = JSON.parse(this.category.template);
      this.controls = this.controlsService.getControls(data);
      let i = 0;
      let values:string  = this.category.values; 
      if(values != null && values.length > 0) 
      {

      
        let jsondata = JSON.parse(atob(values));
        this.controls.forEach(field => {
          field.value = jsondata[""+field.key];
        });
        i++;
      }
      
				
			
     
     

    }

  }

  submit($event){
  
    let strBytes =  btoa(JSON.stringify(this.form.value));
    this.event.publish("callercategory:updated",strBytes);
    this.navController.back();
	}



}
