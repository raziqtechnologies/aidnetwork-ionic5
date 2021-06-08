import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Event } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AidareaService } from '../services/aidarea.service';
import { UtilService } from '../services/util.service';
import { UserService } from '../services/user.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Events } from '@ionic/angular';
import { AreaVO } from '../services/vos/area';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-area',
  templateUrl: './edit-area.page.html',
  styleUrls: ['./edit-area.page.scss'],
})
export class EditAreaPage implements OnInit {

  areaForm: FormGroup;
  newAreaForm: FormGroup;
  cities: any;
  pocs: any;
  area: any = {};
  selectedAreaGroup:any = {};
  selectedpocs:number[];
  areas:AreaVO[];
  areaControl: FormControl;
  cityControl: FormControl;
  firstLoad:boolean = true;
  areaSubscription: Subscription;
  
  @ViewChild('areaComponent2') areaComponent: IonicSelectableComponent;

  validation_messages = {
    'areagroup': [
      { type: 'required', message: 'Areagroup is required.' },
     ],
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public areaService: AidareaService,
    public userService: UserService,
    public util: UtilService,
    private route: ActivatedRoute,
    private event: Events
  ) { }



    loadCities()
    {
      this.util.getStates().subscribe(data => {
        if(data.state == 'Karnataka')
        {
          this.cities = data.values;
        }
        
      }
  
      );
    }

     loadPocs()
    {
      let promise = this.userService.searchUserByRole("POC").toPromise().then(pocs => {
        this.pocs = pocs;
        
      }); 
      console.log("POCS loaded");
      this.createForm();
    }

   

  ngOnInit() {
    if (this.route.snapshot.data['special']) 
    {
      this.selectedAreaGroup = this.route.snapshot.data['special'];
      this.areas = this.selectedAreaGroup.areas;
      if(this.selectedAreaGroup.pocsid)
      this.selectedpocs = Array.from(this.selectedAreaGroup.pocsid.split(",")).map(item => Number(item));;
    
      
    }
  
    this.loadPocs();
    
    this.loadCities();
   
    this.createForm();
    console.log("form loaded");
  
    //this.areaForm.controls["pocs"].setValue(this.selectedpocs,{onlySelf:true});
  
    this.area.city = "Bangalore";
    this.area.state = "Karnataka";
    this.area.country = "India"
    
    
  }

  createForm() {
    this.areaForm = this.fb.group({
      areagroup: [this.selectedAreaGroup.areagroup, [Validators.required]],
      areas: [this.areas, [Validators.required]],
      pocs: [this.selectedpocs, [Validators.required]],
    });

    this.areaControl = this.fb.control(null, Validators.required);
    this.cityControl = this.fb.control(null, Validators.required);
    this.newAreaForm = this.fb.group({
      area: this.areaControl,
      city: this.cityControl,
      
    });
  }

  onSearchFail(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    // Clean form.
    this.areaControl.reset();
    this.cityControl.reset();

    // Copy search text to port name field, so
    // user doesn't have to type again.
    this.areaControl.setValue(event.component.searchText);

    // Show form.
    event.component.showAddItemTemplate();
  }

  onSearchSuccess(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    // Hide form.
    event.component.hideAddItemTemplate();
  }

  addArea(){

    let area = this.newAreaForm.value;
    area.country = "India";
    area.state = "Karnataka";
    this.areaService.addArea(area);
    this.util.presentAlert("Area Added Successfully");
     // Add port to the top of list.
     this.areaComponent.addItem(area).then(() => {
      this.areaComponent.search(area.area);
    });

    // Clean form.
    this.areaControl.reset();
    this.cityControl.reset();

    // Show list.
    this.areaComponent.hideAddItemTemplate();
     
  }

  public onSubmit(value){
    if(this.areaForm.valid)
    {
    
    value.id = this.selectedAreaGroup.id;  
    value.areasid = value.areas.map(a => a.id).join();
    value.pocsid =  value.pocs.join();
    value.pocs = [];
    value.areas = [];
    this.areaService.updateAreaGroup(value)
    .then(
      res => {
        this.createForm();
        this.util.presentAlert("Areagroup updated successfully");
        this.event.publish("areagroup:updated",this.selectedAreaGroup);
        this.router.navigateByUrl('/search-area');
      
      }
    ).catch(err =>{
      this.util.presentAlert(err.error.error.details);
    })
    }
  }

  searchAreas(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
      event.component.startSearch();
      let text = event.text.trim().toLowerCase();
      if (!text) {
        // Close any running subscription.
        if (this.areaSubscription) {
          this.areaSubscription.unsubscribe();
        }

        event.component.items = this.areas;
        
        // Enable and start infinite scroll from the beginning.
        //this.page = 2;
        event.component.endSearch();
        
        return;
      }

    event.component.startSearch();


   
     

      this.areaService.searchAreas(text,1, 15).subscribe(areas =>{
        event.component.items = areas;
      })
      

      event.component.endSearch();
    
      return;
   

   

    
  }
  

}
