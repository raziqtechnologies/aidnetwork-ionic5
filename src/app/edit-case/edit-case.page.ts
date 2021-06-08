import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from '../services/case.service';
import { UtilService } from '../services/util.service';
import { UserService } from '../services/user.service';
import { AidareaService } from '../services/aidarea.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { State } from './constants';
import { User } from '../services/vos/user';
import { DataService } from '../services/data.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AreaGroupVO } from '../services/vos/areagroup';
import { AreaVO } from '../services/vos/area';
import { Subscription, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Events } from '@ionic/angular';


@Component({
  selector: 'app-edit-case',
  templateUrl: './edit-case.page.html',
  styleUrls: ['./edit-case.page.scss'],
})
export class EditCasePage  implements OnInit {
  
  addCaseForm: FormGroup;
  project: string;
  public areas: any = []; 
  pocs:any = [];
  volunteers:any = [];
  isAdmin: boolean;
  isOperator: boolean;
  isPOC: boolean;
  isVolunteer: boolean;
  status: State;
  currentuser: User;
  selectedArea: any;
  callercategory: any;
  casecategory: any;
  caseVo:any;
  areaSubscription: Subscription;
  page:number = 1;
  noofpage:number;
  size:number = 15;
  slicedareas:any = [];

  
   constructor(
     private fb: FormBuilder,
     private route: ActivatedRoute,
     public caseService: CaseService,
     public util: UtilService,
     private userService: UserService,
     private areaService: AidareaService,
     private router: Router,
     private auth:AngularFireAuth,
     private dataservice:DataService,
     private event: Events
   ) { 


    this.event.subscribe('callercategory:updated', (val) => {
      
      this.caseVo.calcatvalues = val;
    });
    this.page = 2;
    if (this.route.snapshot.data['special']) 
    {
      
      
      this.caseVo = this.route.snapshot.data['special'];
     
     
      this.project = "Carona Response";

    }

    this.loadAreas();

     
     
    }

    public loadTemplate()
    {
      
      this.callercategory.forEach(category => {
        if(category.name == this.addCaseForm.value.callercategory)
        {
          if(category.template != null)
          {
            category.values = this.caseVo.calcatvalues;
            this.dataservice.setData(category.id, category);
            this.router.navigateByUrl('/template/' + category.id);
            
          
          return;
          }
          else{
            category.values="";
            this.caseVo.calcatvalues = "";
          }
        }
      });
  
    }


    
   loadAreas() {
    this.createForm();
   
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
          if(value1.areagroupid == this.caseVo.areagroupid && value1.id == this.caseVo.areaid)
          {
             this.selectedArea = value1;
             this.pocs = this.selectedArea.pocs;
             //this.selectedArea = this.caseVo.area;
             if(this.caseVo.poc)
             {
               let promise = this.userService.getChildUsers(this.caseVo.poc).toPromise().then(poc => {
                 this.volunteers = poc;
                this.createForm();
               
               })
             }
             else{
              this.createForm();
             }
             
          }
          this.areas.push(value1);
         
        }

        this.noofpage = this.areas.length/this.size;
        this.slicedareas = this.getAreas(this.page); 

          
      }
      

    })


   



  }

  

  public addComments()
  {
    this.dataservice.setData(this.caseVo.id, this.caseVo);
    this.router.navigateByUrl('/add-comments/' + this.caseVo.id);
     
  }

  canEdit():boolean
  {
      if(this.caseVo.status == State.Open)
      {
        return true;
      }

      return false;
  }

  canApprove():boolean
  {
      if(this.caseVo.status == State.Open)
      {
        return true;
      }

      return false;
  }

  canReject():boolean
  {
    if(this.caseVo.status != State.Rejected && this.caseVo.status != State.Closed) 
    {
      return true;
    }

      return false;
  }

  canClose():boolean
  {
      if(this.caseVo.status != State.Closed && this.caseVo.status != State.Rejected) 
      {
        return true;
      }

      return false;
  }

  

  canMarkRejectPOC():boolean
  {
      if(this.caseVo.status == State.Approved  || this.caseVo.status == State.ToVerify || this.caseVo.status == State.MarkRejectedVolunteer)
      {
        return true;
      }

      return false;
  }

  canMarkClosePOC():boolean
  {
      if(this.caseVo.status == State.Approved  || this.caseVo.status == State.ToVerify || this.caseVo.status == State.MarkClosedVolunteer)
      {
        return true;
      }

      return false;
  }

  canMarkRejectVolunteer():boolean
  {
      if(this.caseVo.status == State.ToVerify || this.caseVo.status == State.ToDeliver)
      {
        return true;
      }

      return false;
  }

  canMarkCloseVolunteer():boolean
  {
      if(this.caseVo.status == State.ToVerify || this.caseVo.status == State.ToDeliver)
      {
        return true;
      }

      return false;
  }

  canReturn():boolean
  {
      if(this.caseVo.status == State.Approved  )
      {
        return true;
      }

      return false;
  }

  canResubmit():boolean
  {
      if(this.caseVo.status == State.Approved  )
      {
        return true;
      }

      return false;
  }

  canToVerify():boolean
  {
      if(this.caseVo.status == State.Approved  )
      {
        return true;
      }

      return false;
  }

  canToDeliver():boolean
  {
      if(this.caseVo.status == State.Approved  || this.caseVo.status == State.ToVerify)
      {
        return true;
      }

      return false;
  }

  ngOnInit() {

    
    this.dataservice.getLocalData(this.auth.auth.currentUser.email).then(val =>{
      
      this.currentuser = new User(val.firstname,val.lastname,val.emailid,val.role);
    });

   
  }

  validation_messages = {
    
    'callercatgory': [
      { type: 'required', message: 'Caller Category is required.' }
      ],
      'callername': [
        { type: 'required', message: 'Caller Name is required.' }
      ],
      'callerphone': [
        { type: 'required', message: 'Caller Phone is required.' }
      ],
      'benname': [
        { type: 'required', message: 'Benefiaciary is required.' }
      ],
      'benphone': [
        { type: 'required', message: 'Benefiaciary Phone is required.' }
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

  public createForm() {



      this.addCaseForm = this.fb.group({
      callercategory: [this.caseVo.callercategory, Validators.required ],
      callername: [this.caseVo.callername, Validators.required ],
      callerphone: [this.caseVo.callerphone, Validators.required ],
      benname: [this.caseVo.benname, Validators.required ],
      benphone: [this.caseVo.benphone, Validators.required ],
      bencardtype: [this.caseVo.bencardtype, Validators.required ],
      bendescription: [this.caseVo.bendescription, Validators.required ],
      casecategory: [this.caseVo.casecategory, Validators.required ],
      casedescription: [this.caseVo.casedescription, Validators.required ],
      caseaffectno: [this.caseVo.caseaffectno, Validators.required ],
      casepriority: [this.caseVo.casepriority, Validators.required ],
      area:new FormControl(this.selectedArea, null),
      pincode: [this.caseVo.pincode, Validators.required ],
      address1: [this.caseVo.address1, Validators.required ],
      landmark: [this.caseVo.landmark, Validators.required ],
      status: [this.caseVo.status, Validators.required ],
      sameascaller: new FormControl(this.caseVo.sameascaller, null),
      poc: new FormControl(this.caseVo.poc, null),
      volunteer: new FormControl(this.caseVo.volunteer,null),  
      operator: new FormControl(this.caseVo.operator,null),  
    });

    
    
  }


  public resetFields()
  {
    this.addCaseForm = this.fb.group({
      callercategory: new FormControl(null, Validators.required),
      callername: new FormControl(null, Validators.required),
      callerphone: new FormControl(null, Validators.required),
      benname: new FormControl(null, Validators.required),
      benphone: new FormControl(null, Validators.required),
      bencardtype: new FormControl(null, Validators.required),
      bendescription: new FormControl(null, Validators.required),
      casecategory: new FormControl(null, Validators.required),
      casedescription: new FormControl(null, Validators.required),
      caseaffectno: new FormControl(null, Validators.required),
      casepriority: new FormControl(null, Validators.required),
      areagroup: new FormControl(null, Validators.required),
      area: new FormControl(null, Validators.required),
      pincode: new FormControl(null, Validators.required),
      address1: new FormControl(null, Validators.required),
      landmark: new FormControl(null, Validators.required),
      sameascaller: new FormControl(null, null),
      poc: new FormControl(null, null),
      volunteer: new FormControl(null, null),
    });
  }
  getActualDate(millis)
  {
    let date = new Date(millis);  
    return (date.getDate() + "/" + (date.getMonth() + 1) + "/" + date. getFullYear());
  }

  public onSubmit(value)
  {
    if(this.addCaseForm.valid)
    {
      this.util.loadingPresent();  
      value.id = this.caseVo.id;
      value.areagroupid = this.selectedArea.areagroupid;
      value.areaid = this.selectedArea.id;
      value.areagroupname = this.selectedArea.areagroup; 
      value.areaname = this.selectedArea.area; 
      value.calcatvalues =  this.caseVo.calcatvalues;
      this.caseService.updateCase(value).then(
      res => {
        this.util.loadingDismiss();
        this.util.presentAlert("Case updated successfully","Success Message","Case Updated");
        this.event.publish("case:updated",value);
        this.router.navigate(['/search-case']);
        //this.router.navigate(['/home']);
      }
     ).catch(err => {
      this.util.presentAlert("Update Failed, Contact administrator")
     })
    }
  }

  updateStatus(status:string)
  {
    this.addCaseForm.value.status = status;
    
    if(status == State.ToVerify || status == State.Approved || status == State.ToDeliver)
    {
      this.onSubmit(this.addCaseForm.value);
    }
    else{

      
      this.caseService.updateStatus(this.caseVo.id,status).then(
        res => {
          this.util.presentAlert("Case updated as '" + status +"'");
          this.caseVo.status = status;
          this.event.publish("case:updated",this.caseVo);
          this.router.navigateByUrl('/search-case');
        
          //this.router.navigate(['/home']);
        }
      )
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
     let pocs = this.addCaseForm.value.area.pocs;
     this.selectedArea = this.addCaseForm.value.area;
     this.pocs = pocs;
  }

  pocChange(event:any)
  {
    let pocid = this.addCaseForm.value.poc.id;
    this.userService.getChildUsers(pocid).subscribe(poc => {
      this.volunteers = poc;
     
      
    })
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
