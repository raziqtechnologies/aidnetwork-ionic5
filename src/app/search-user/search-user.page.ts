import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';

import { debounceTime } from "rxjs/operators";
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

import { from, of, zip, Observable } from 'rxjs';
import { groupBy, reduce, map,mergeMap } from 'rxjs/operators';
import { Events } from '@ionic/angular';


@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.page.html',
  styleUrls: ['./search-user.page.scss'],
})
export class SearchUserPage implements OnInit {



  public searchControl: FormControl;
  public users: any;
  public groupedusers: any = [];
  public currentuser:any;

  constructor(private events:Events,private dataService: UserService,private navigationService: DataService,private router: Router) {
    this.searchControl = new FormControl();

    this.events.subscribe('user:updated', (val) => {
      
      this.ngOnInit();
    });
  }



  
  ngOnInit() {
    this.setFilteredItems("");

    this.searchControl.valueChanges
      .pipe(debounceTime(700))
      .subscribe(search => {

        pocs: [];
        this.setFilteredItems(search);


      });



  }

  selectedUser(user:any)
  {
    this.currentuser = user;
    this.navigationService.setData(user.id,user);
    this.router.navigateByUrl('/edit-user/'+user.id);
    
  }

  

  setFilteredItems(searchTerm) {

    this.dataService.listUsers(searchTerm).subscribe(data => {
      this.groupedusers = [];
      this.users = data;
       
      from(this.users).pipe(
        groupBy(p => p["role"],p => p),
        mergeMap(group$ =>
          group$.pipe(reduce((acc, cur) => [...acc, cur], [`${group$.key}`]))
        ),
        map(arr => ({ role: arr[0], values: arr.slice(1) }))
      ).subscribe(final => {
        
      
        this.groupedusers.push(final);
        
      })


    })
  }
}
