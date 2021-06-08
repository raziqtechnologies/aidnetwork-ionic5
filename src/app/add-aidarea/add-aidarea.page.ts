import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AidareaService } from '../services/aidarea.service';
import { UtilService } from '../services/util.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { UserService } from '../services/user.service';
import { DataService } from '../services/data.service';
import { AreaVO } from '../services/vos/area';


@Component({
  selector: 'app-add-aidarea',
  templateUrl: './add-aidarea.page.html',
  styleUrls: ['./add-aidarea.page.scss'],
})
export class AddAidareaPage implements OnInit {


  areaForm: FormGroup;
  newAreaForm: FormGroup;
  cities: any;
  pocs: any;
  areas: AreaVO[];
  area: any = {};
  page: number=1;
  allareas: any;
  areaControl: FormControl;
  cityControl: FormControl;
  
  @ViewChild('areaComponent') areaComponent: IonicSelectableComponent;

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
    public dataservice: DataService
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
      this.userService.searchUserByRole("POC").subscribe(poc => {
        this.pocs = poc;
        
      })
    }

    

  ngOnInit() {
    this.createForm();
 
    
    this.loadPocs();
    this.area.city = "Bangalore";
    this.area.state = "Karnataka";
    this.area.country = "India"
    //cache
    this.page = 1;
    this.areaService.searchAreas("",this.page, 15).subscribe(areas => {
      this.areas = areas;
    });

    this.loadCities();
  }

  createForm() {
    this.areaForm = this.fb.group({
      areagroup: [null, [Validators.required]],
      selectedarea: [null, [Validators.required]],
      pocs: [null, [Validators.required]],
    });

    this.areaControl = this.fb.control(null, Validators.required);
    this.cityControl = this.fb.control(null, Validators.required);
    this.newAreaForm = this.fb.group({
      area: this.areaControl,
      city: this.cityControl,
      
    });
  }

  

  filterArea(ports: AreaVO[], text: string) {
    return ports.filter(port => {
      return port.area.toLowerCase().indexOf(text) !== -1;
    });
  }

  getMoreAreas(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = (event.text || '').trim().toLowerCase();

    // There're no more ports - disable infinite scroll.
     // There're no more ports - disable infinite scroll.
    

    this.areaService.searchAreas(text,this.page, 15).subscribe(areas => {
      areas = event.component.items.concat(areas);

      // if (text) {
      //   areas = this.filterArea(areas, text);
      // }

      event.component.items = areas;
      event.component.endInfiniteScroll();
      this.page++;
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

  searchAreas(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();


   
     

      this.areaService.searchAreas(text,1, 15).subscribe(areas =>{
        event.component.items = areas;
      })
      
      // Enable and start infinite scroll from the beginning.
      this.page = 2;
      event.component.endSearch();
      event.component.enableInfiniteScroll();
      return;
   

   

    
  }


  public onSubmit(value){
    if(this.areaForm.valid)
    {
     
     value.areasid = value.selectedarea.map(a => a.id).join();
     value.pocsid =  value.pocs.map(a => a.id).join();
    this.areaService.addAreaGroup(value)
    .then(
      res => {
        this.createForm();
        this.util.presentAlert("Areagroup added successfully");
        
      
      }
    ).catch(err =>{
      this.util.presentAlert(err.error.error.details);
    })
    }
  }

  

}
