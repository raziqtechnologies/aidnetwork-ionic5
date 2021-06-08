import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CaseService } from '../services/case.service';
import { UtilService } from '../services/util.service';
import { ValueAccessor } from '@ionic/angular/dist/directives/control-value-accessors/value-accessor';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AidareaService } from '../services/aidarea.service';
import { UserService } from '../services/user.service';
import { DataService } from '../services/data.service';
import { User } from '../services/vos/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AreaGroupVO } from '../services/vos/areagroup';
import { AreaVO } from '../services/vos/area';
import { Subscription, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Events } from '@ionic/angular';




@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.page.html',
  styleUrls: ['./add-case.page.scss'],
})
export class AddCasePage implements OnInit {

  @ViewChild('areaComponent') areaComponent: IonicSelectableComponent;

  addCaseForm: FormGroup;
  project: string;
  public areas: any = []; 
  pocs:any = [];
  volunteers:any = [];
  selectedArea:any;
  currentuser:any;
  callercategory:any;
  casecategory:any;
  areaSubscription: Subscription;
  page:number = 1;
  noofpage:number;
  size:number = 15;
  slicedareas:any = [];
  templatevalues = {};
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public caseService: CaseService,
    public areaService: AidareaService,
    public util: UtilService,
    public userService: UserService,
    public dataService: DataService,
    public afAuth: AngularFireAuth,
    public events: Events
    
  ) { 

    this.events.subscribe('callercategory:updated', (val) => {
      
        this.templatevalues = val;
    });

  }


  loadAreas() {

    this.caseService.listCallerCategory().subscribe(data =>{
      this.callercategory = data;
    })

    this.caseService.listCaseCategory().subscribe(data =>{
      this.casecategory = data;
    });


    let areagroups: any = [];
    this.areaService.searchAreaGroup("").subscribe(area => {

      let areagroup = area;
      for(var i = 0;i<areagroup.length;i++)
      {
        let value = areagroup[i];
        let temp = value.areas;
        for(var j = 0;j<temp.length;j++)
        {
          let value1 = temp[j];
          value1.areagroup = value.areagroup;
          value1.areagroupid = value.id;
          value1.pocs = value.pocs;
          this.areas.push(value1);
        }

          
      }

      this.noofpage = this.areas.length/this.size;
      this.slicedareas = this.getAreas(this.page); 

    })




  }
  ngOnInit() {
    this.createForm();
    //projectName hardcoded
    this.project = "Carona Response";

    this.loadAreas();

    this.dataService.getLocalData(this.afAuth.auth.currentUser.email).then(val =>{
      
      this.currentuser = new User(val.firstname,val.lastname,val.emailid,val.role);
    });
  }


  validation_messages = {

    'callertcategory': [
      { type: 'required', message: 'Caller Category is required.' }
    ],
    'callername': [
      { type: 'required', message: 'Caller Name is required.' }
    ],
    'callerphone': [
      { type: 'required', message: 'Caller Phone is invalid or not present.' }
    ],
    'benname': [
      { type: 'required', message: 'Benefiaciary is required.' }
    ],
    'benphone': [
      { type: 'required', message: 'Benefiaciary Phone is invalid or not present.' }
    ],
    'bencardtype': [
      { type: 'required', message: 'Ration Card Type is required.' }
    ],
    'bendescription': [
      { type: 'required', message: 'Description is required.' }
    ],
    'casecategory': [
      { type: 'required', message: 'Case Category is required.' }
    ],
    'casedescription': [
      { type: 'required', message: 'Case Description is required.' }
    ],
    'caseaffectno': [
      { type: 'required', message: 'Affected Person Count is required.' }
    ],
    'casepriority': [
      { type: 'required', message: 'Case Priority is required.' }
    ],
    'areagroup': [
      { type: 'required', message: 'Area Group is required.' }
    ],
    'area': [
      { type: 'required', message: 'Area is required.' }
    ],
    'city': [
      { type: 'required', message: 'City is required.' }
    ],
    'pincode': [
      { type: 'required', message: 'Pincode is required.' }
    ],
    'address1': [
      { type: 'required', message: 'Address Line is required.' }
    ],
    'landmark': [
      { type: 'required', message: 'Landmark is required' }
    ]



  };





  createForm() {
    this.addCaseForm = this.fb.group({
      callercategory: [null, Validators.required],
      callername: [null, Validators.required],
      callerphone: [null, [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      benname: [null, Validators.required],
      benphone: [null, [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      bencardtype: [null, Validators.required],
      bendescription: [null, Validators.required],
      casecategory: [null, Validators.required],
      casedescription: [null, Validators.required],
      caseaffectno: [null, Validators.required],
      casepriority: [null, Validators.required],
      area: [null, Validators.required],
      pincode: [null, Validators.required],
      address1: [null, Validators.required],
      landmark: [null, Validators.required],
      sameascaller: new FormControl(null, null),
      poc: new FormControl(null, null),
      volunteer: new FormControl(null, null),

    });

  }


  public convertToNumber(event: any): number {
    return +(event.detail.value);
   }
   public convertToString(value: number): string {
    return value.toString();
   }


  resetFields() {
   this.createForm();
  }

  public onSubmit(value) {
    
    if (this.addCaseForm.valid) {
      value.status = "Open";
      this.util.loadingPresent();  
     
      value.areagroupid = this.selectedArea.areagroupid;
      value.areaid = this.selectedArea.id;
      value.areagroupname = this.selectedArea.areagroup; 
      value.areaname = this.selectedArea.area; 
      value.operator = this.currentuser.emailid;
      value.calcatvalues = this.templatevalues;
      this.caseService.addCase(value).then( res => {
        this.util.loadingDismiss();
        this.util.presentAlert("Case added successfully","Success Message","Case Added")
        this.router.navigate(['/search-case']);
        //this.router.navigate(['/home']);
      }
     ).catch(err => {
      this.util.presentAlert("There was a problem adding the new case, Contact administrator")
     })

      this.resetFields();
      this.router.navigate(['/']);
      

    }
  }

  public sameAsCaller() {
    if (this.addCaseForm.controls["sameascaller"].value) {
      this.addCaseForm.controls["benphone"].setValue(this.addCaseForm.controls["callerphone"].value);
      this.addCaseForm.controls["benname"].setValue(this.addCaseForm.controls["callername"].value);
    }
    else {
      this.addCaseForm.controls["benphone"].setValue(null);
      this.addCaseForm.controls["benname"].setValue(null);
    }

  }
  
  areaChange(event:any)
  {
    this.selectedArea = this.addCaseForm.value.area

  }

  public loadTemplate()
  {
    
    this.callercategory.forEach(category => {
      if(category.name == this.addCaseForm.value.callercategory)
      {
        if(category.template != null)
        {
          category.values = this.templatevalues;
          this.dataService.setData(category.id, category);
          this.router.navigateByUrl('/template/' + category.id);
          
        
        return;
        }
      }
    });

  }

  filterArea(areas: any[], text: string) {
    return areas.filter(temp => {
      return temp.area.toLowerCase().indexOf(text) !== -1 ||
      temp.areagroup.toLowerCase().indexOf(text) !== -1;
    });
  }

  searchAreas(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    // Close any running subscription.
    if (this.areaSubscription) {
      this.areaSubscription.unsubscribe();
    }

    if (!text) {
      // Close any running subscription.
      if (this.areaSubscription) {
        this.areaSubscription.unsubscribe();
      }

      event.component.items = this.getAreas(1);
      
      // Enable and start infinite scroll from the beginning.
      this.page = 2;
      event.component.endSearch();
      event.component.enableInfiniteScroll();
      return;
    }

    this.areaSubscription = this.getAreasAsync().subscribe(temp => {
      // Subscription will be closed when unsubscribed manually.
      if (this.areaSubscription.closed) {
        return;
      }

      event.component.items = this.filterArea(temp, text);
      event.component.endSearch();
    });
   

    
  }

  getAreasAsync(page?: number, timeout = 2000): Observable<AreaVO[]> {
    return new Observable<any[]>(observer => {
      observer.next(this.getAreas(page));
      observer.complete();
    }).pipe(delay(timeout));
  }

  getAreas(page?:number) : any[]
  {
    let slicedareas = [];
    if (page) {
      slicedareas = this.areas.slice((page - 1) *  this.size, ((page - 1) *  this.size) +  this.size);
    }
    else{
      return this.areas;
    }

    return slicedareas;
  }

  getMoreAreas(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = (event.text || '').trim().toLowerCase();

    

    // There're no more ports - disable infinite scroll.
    if (this.page > this.noofpage) {
      event.component.disableInfiniteScroll();
      return;
    }
    //NO NEED FOR SLICED AREAS, HERE CONCAT DOES THE SAME
    this.getAreasAsync(this.page, this.size).subscribe(areas => {
      areas = event.component.items.concat(areas);

      if (text) {
        areas = this.filterArea(areas, text);
      }

      event.component.items = areas;
      event.component.endInfiniteScroll();
      this.page++;
    });
  }



}
