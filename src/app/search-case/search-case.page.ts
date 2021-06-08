import { Component, OnInit, ViewChild } from '@angular/core';
import { CaseService } from "../services/case.service";
import { CaseVO } from '../services/vos/case';
import { from, of, zip, Observable } from 'rxjs';
import { groupBy, reduce, map, mergeMap } from 'rxjs/operators';
import { debounceTime } from "rxjs/operators";
import { DataService } from '../services/data.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../services/vos/user';
import { State } from '../edit-case/constants';
import { UtilService } from '../services/util.service';
import { AngularFireAuth } from '@angular/fire/auth';

import { IonInfiniteScroll, Events } from '@ionic/angular';
import { IonContent } from '@ionic/angular';



@Component({
  selector: 'app-search-case',
  templateUrl: './search-case.page.html',
  styleUrls: ['./search-case.page.scss'],
})
export class SearchCasePage implements OnInit {

  //search term
  public searchTerm: string = "";
  public cases: any = [];
  public groupedCases: any = [] ;
  public casesArray: any = [];
  public filteredCases: any = [];
  public data: any = [];
  public searchControl: FormControl;
  public chooseControl: FormControl;
  public currentuser: User;
  public groupbyitem : any = [];
  public mapGroup : any;
  public query : string;
  public deFaultGroupBy : string = "areaname";
  public pocs:any = [];
  public areas:any = [];
  public status:any = [];
  public priority:any = [];
  public currentRecord:any = {};
  public showSlide:boolean = false;
  public allowMultiselect:boolean = false;
  public viewPOC:boolean = false;
  public viewStatus:boolean = false;
  public option:number = 1;
  //infinite scroll
  public itemListData:any = [];
  page_number = 0;
  page_limit = 25;
  search_option = 6;
  noresults = 0;
 
 
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;

  constructor(private events:Events,private router: Router,public dataservice: DataService, private caseService: CaseService, private navigationService: DataService,  private userService: UserService,private util:UtilService,public afAuth: AngularFireAuth) {

    this.searchControl = new FormControl();
    this.chooseControl = new FormControl();
    
    this.events.subscribe('case:updated', (val) => {
      let index:number = 0;
      let updated:number = 0;
      if(this.itemListData.length > 0)
      {
        this.itemListData.forEach(function (cases) {
          if(cases.id == val.id)
          {
              updated = index;
              return;
          }
          index++;
        });
        this.itemListData[updated] = val;
      }
      
    });
    

  }

  public loadCases(isFirstLoad, event) {
    this.util.loadingPresent();
    if(isFirstLoad)
    {
      this.page_number = 0;
    }
    this.caseService.searchCases(this.search_option,this.searchControl.value,this.page_number+"",this.page_limit+"").subscribe(data =>{
      let temp:any = data;
      this.util.loadingDismiss();  
      if(temp.length > 0)
      {
        for (let i = 0; i < temp.length; i++) {
          this.itemListData.push(temp[i]);
        }
        this.page_number++;
        this.noresults = 1;
      }
      else{
        if(this.itemListData.length == 0)
        {
          this.noresults = 2;
        }
      }
      
      if (!isFirstLoad)
          event.target.complete();

       

      
    })


  

  }

  
     
  public getPlaceHolder()
  {
      if(this.search_option == 1)
      {
         return "Search By Case Id";
      }
      else if(this.search_option == 2)
      {
         return "Search By Beneficiary Name";
      }
      else if(this.search_option == 3)
      {
         return "Search By Beneficiary Phone";
      }
      else if(this.search_option == 4)
      {
         return "Search By Status";
      }
      else if(this.search_option == 5)
      {
         return "Search By Areaname";
      }
      
  }

  public chooseSearch()
  {
      this.action(this.chooseControl.value);
  }

  public action(option:number)
  {
 
    this.option = option;
   
    this.showSlide = false;
      this.allowMultiselect=false;
      if(option == 6)
      {
        this.showSlide = true;
        if(this.currentuser.isAdmin())
        {
          this.showPOC();
          this.viewPOC = true;
          this.viewStatus = true;
        }
        else{
          this.viewStatus = true;
          this.showStatus();
        }
        
       
      }
      else if(option == 7)
      {
        this.allowMultiselect = true;
      }
      else{
        this.clearSearch();
      }
     
      this.search_option = option;
     
  }

  doInfinite(event) {
    this.loadCases(false, event);
  }


  public showPOC()
  {
  
    this.caseService.groupByPOC().subscribe(data =>{
      this.pocs = data;
      this.util.loadingDismiss();
    });
  }

  public showStatus()
  {
    this.util.loadingPresent();
    this.caseService.groupByStatus().subscribe(data =>{
      this.status = data;
      this.util.loadingDismiss();
    });
    
  }
  
  ngOnInit() {
    
   
    

  
    this.searchControl.valueChanges
      .pipe(debounceTime(700))
      .subscribe(search => {
       
        if(this.searchControl.value.length >= 4)
        {
          this.itemListData = [];
          this.loadCases(true,event);
          
        }
        if(this.searchControl.value.length == 0)
        {
          this.clearSearch();
        }
        
      });

      
  }

  ionViewDidEnter(){
    this.util.loadingPresent();
    this.dataservice.getLocalData(this.afAuth.auth.currentUser.email).then(val => {
      this.currentuser = new User(val.firstname, val.lastname, val.emailid, val.role);
      this.action(this.search_option);
    
     // this.setFilteredItems();
       
    });
  }

  public updateStatus(status: string) {
 
    let ids = [];
    this.itemListData.forEach(function (val) {
      if(val.isChecked)
      {
        ids.push(val.id);
        
      }
    });

    if(ids.length>0)
    {
      this.caseService.updateStatus(ids.join(","),status).then(
        res => {
          this.util.presentAlert("Case updated as '" + status +"'")
          this.router.navigate(['/search-case']);
          //this.router.navigate(['/home']);
          this.action(this.search_option);
          this.clearSearch();
        }
      )
    }
    else{
      this.util.presentAlert("Please choose the cases")
    }

  }

  public clearSearch()
  {
    this.currentRecord = {};
    this.showSlide = false;
    this.itemListData = [];
    this.cases = [];
    this.allowMultiselect = false;
    //this.searchControl.setValue("");
  }

  public selectedCase(caseVo: any) {
 
    this.navigationService.setData(caseVo.id, caseVo);
    this.router.navigateByUrl('/edit-case/' + caseVo.id);
  }

  public selectedPOC(POC: any,slides:any) {
    this.currentRecord.POC = POC.name;
    this.caseService.groupByStatus(POC.name).subscribe(data =>{
      this.status = data;
      slides.slideNext();
    });
    this.content.scrollToTop();
  }

  public selectedArea(area: any,slides:any) {
    this.currentRecord.AREA = area.name;
    this.caseService.groupByPriority(this.currentRecord.POC,this.currentRecord.STATUS,area.name).subscribe(data =>{
      this.priority = data;
      slides.slideNext();
    });
    this.content.scrollToTop();
  }

  public selectedStatus(status: any,slides:any) {
    this.currentRecord.STATUS = status.name;
    this.caseService.groupByArea(this.currentRecord.POC,this.currentRecord.STATUS).subscribe(data =>{
      this.areas = data;
      slides.slideNext();
    });
    this.content.scrollToTop();
  }

  public selectedPriority(priority: any,slides:any) {
    this.currentRecord.PRIORITY = priority.name;
    let status:string[] = [];
    this.itemListData = [];
    status[0] = this.currentRecord.STATUS;
    this.caseService.groupCases(status,this.currentRecord.PRIORITY,this.currentRecord.AREA,this.currentRecord.POC).subscribe(data => {
      this.itemListData = data;
      slides.slideNext();
    })
    this.content.scrollToTop();
  }

 

  

  getStatusBasedOnUser():string[]
  {
      let status:string[] = [];
      if(this.currentuser.isOperator())
      {
        status.push(State.Open);
        status.push(State.Approved);
        status.push(State.Closed);
        status.push(State.ToDeliver);
        status.push(State.Rejected);
      }
      else if(this.currentuser.isPOC())
      {
        
        status.push(State.Approved);
        status.push(State.ToDeliver);
        status.push(State.ToVerify);
        status.push(State.MarkClosedVolunteer);
        status.push(State.MarkRejectedVolunteer);
        status.push(State.MarkClosedPOC);
        status.push(State.MarkRejectedPOC);
        status.push(State.Returned);
      }
      else if(this.currentuser.isVolunteer())
      {
        
        status.push(State.ToDeliver);
        status.push(State.ToVerify);
        status.push(State.MarkRejectedVolunteer);
        status.push(State.MarkClosedVolunteer);
        
      }
      return status;

  }


 



  //get all cases
  public getCases() {
    //retreiving part
    this.caseService.getCases().subscribe(data => {
      this.cases = data;
      this.casesArray = this.cases;
      console.log(this.casesArray);

    });
  }

  

  
  //group by value from dropwdown
  public groupByValue()
  {
    this.groupedCases = [];
   // this.parseCaseVo();
    from(this.cases).pipe(
      groupBy(p => p[this.deFaultGroupBy], p => p),
      mergeMap(group$ =>
        group$.pipe(reduce((acc, cur) => [...acc, cur], [`${group$.key}`]))
      ),
      map(arr => ({ group: arr[0], values: arr.slice(1) }))
    ).subscribe(final => {
      this.groupedCases.push(final);

    })

  }


  //to set areaname in casevo for groupby
  // public parseCaseVo()
  // {
  //   for(let i =0; i < this.cases.length; i++)
  //   {
  //     this.cases[i].areaName = this.cases[i].area.area;
  //     this.cases[i].createdate = this.convertTimeToDate(this.cases[i].createdate);
      
  //   }
  // }


  public convertTimeToDate(val: any): string
  {
    let date = new Date(val); 
    return date.toDateString() 

  }


 


  






 

}
