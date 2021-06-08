import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { Observable,of } from 'rxjs';
import { BaseService } from './baseservice';
import { HttpParams, HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { AreaGroupVO } from './vos/areagroup';
import { AreaVO } from './vos/area';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class AidareaService extends BaseService {

  moduleAreaURL: string = this.baseURL + "/area";
  moduleAreaGroupURL: string = this.baseURL + "/areagroup";

  constructor(public db: AngularFirestore, public firebase: AngularFireModule, private httpClient: HttpClient,public util:UtilService) {
    super();
  }

  public addAreaGroup(area) {
    area.createdate = new Date().getTime();
    return this.httpClient
      .post(this.moduleAreaGroupURL, area)
      .toPromise();

  }

  public addArea(area) {

    return this.httpClient
      .post(this.moduleAreaURL, area)
      .toPromise();
  }



  updateAreaGroup(area) {
    area.createdate = new Date().getTime();
    return this.httpClient
      .post(this.moduleAreaGroupURL, area)
      .toPromise();

  }

  getAllAreas() {

    return this.httpClient
      .get<AreaVO>(this.moduleAreaURL)
      .pipe(
        retry(0),
        catchError(this.handleError)
      )

  }

  searchAreas(area?,page?, size?): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    params = params.append('area', area);
    if (page != undefined) {
      return this.httpClient
        .get<AreaVO>(this.moduleAreaURL, { params: params })
        .pipe(
          retry(2),
          catchError(this.handleError)
        )

    }
    else if(area != undefined) {
      let params = new HttpParams();
      params = params.append('area', area);
      return this.httpClient
        .get<AreaVO>(this.moduleAreaURL, { params: params })
        .pipe(
          retry(2),
          catchError(this.handleError)
        )

    }
  }

  getAllAreasGroups(): Observable<any> {
    return this.httpClient
    .get<AreaGroupVO>(this.moduleAreaGroupURL)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )

  }

  searchAreaGroup(areagroup: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('areagroup', areagroup);
    return this.httpClient
      .get<AreaGroupVO>(this.moduleAreaGroupURL, { params: params })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )


  }


}
