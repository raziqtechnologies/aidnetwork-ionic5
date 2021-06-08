import { Component, OnInit } from '@angular/core';
import { AidareaService } from '../services/aidarea.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { debounceTime } from "rxjs/operators";
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

import { from, of, zip, Observable } from 'rxjs';
import { groupBy, reduce, map,mergeMap } from 'rxjs/operators';
import { Events } from '@ionic/angular';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-search-area',
  templateUrl: './search-area.page.html',
  styleUrls: ['./search-area.page.scss'],
})
export class SearchAreaPage implements OnInit {

  public searchControl: FormControl;
  public areas: any;
  public groupedareas: any = [];

  constructor(private util:UtilService,private events:Events,private dataService: AidareaService,private navigationService: DataService,private router: Router) {
    this.searchControl = new FormControl();
    this.events.subscribe('areagroup:updated', (val) => {
      
      this.ngOnInit();
    });
  }

  
  ngOnInit() {
    this.getAll();

    this.searchControl.valueChanges
      .pipe(debounceTime(700))
      .subscribe(search => {
        this.setFilteredItems(search);
      });
  }

  selectedArea(area:any)
  {
    this.navigationService.setData(area.id,area);
    this.router.navigateByUrl('/edit-area/'+area.id);
    console.log(area);
  }

  toggleGroup(group) {
    group.show = !group.show;
  };
  isGroupShown(group) {
    return group.show;
  };

  async getAll() {  
    let data;
    this.util.loadingPresent();
    this.dataService.getAllAreasGroups().subscribe(areas => {
      
      this.areas = areas
      data = areas;
      this.util.loadingDismiss();
      
    });
    await data;
   
  }

  setFilteredItems(searchTerm) {  
   
    this.dataService.searchAreaGroup(searchTerm).subscribe(data => {
      
      this.areas = data


      
    });
  }


  
}
