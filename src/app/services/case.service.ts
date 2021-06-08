import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { firestore } from 'firebase/app';
import { UtilService } from './util.service';
import { User } from './vos/user';
import { retry, catchError } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { BaseService } from './baseservice';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CaseVO } from './vos/case';
import { GroupVO } from './vos/group';
import { CommentVO } from './vos/comment';
import { MetaVO } from './vos/meta';


@Injectable({
  providedIn: 'root'
})
export class CaseService extends BaseService {

  moduleURL: string = this.baseURL + "/case";

  constructor( private httpClient: HttpClient,public db: AngularFirestore, public firebase: AngularFireModule,public util: UtilService,public loader:LoadingController) { 
    super();

  }
  
  searchRes: any;


  //need to check
  public addCase(caseVO) {
    caseVO.createdate = new Date().getTime();
    return this.httpClient
      .post(this.moduleURL, caseVO)
      .toPromise();
  }

  public updateCase(caseVO) {
      
    caseVO.createdate = new Date().getTime();
    return this.httpClient
      .post(this.moduleURL, caseVO)
      .toPromise();

  }

  public addComments(id:string, comment:any) {
    comment.createddate = new Date().getTime();
    comment.caseid = id;
    return this.httpClient
      .post(this.moduleURL+"/comment", comment)
      .toPromise();
  }

  public listComment(caseid:number) {

    let url:string = "/"+caseid +"/comment";
    return this.httpClient
    .get<CommentVO>(this.moduleURL + url)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )

  }
  

  public updateStatus(id:string, value:string) {

    let caseVO:CaseVO = new CaseVO();
    caseVO.id = id;
    caseVO.status = value;

    return this.httpClient
      .post(this.moduleURL+"/status", caseVO)
      .toPromise();
  }

  public getCases() {
    let params = new HttpParams();
    params = params.append('validate', "true");
    return this.httpClient
    .get<CaseVO>(this.moduleURL,{params:params})
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

 

  //updated
  public groupCases(status?:string[],priority?:string,areaname?:string,POC?:string) {

    let params = new HttpParams();


    if (status && status.length > 0) {
      params = params.append('status', status.join(","));
    }

    if (priority) {
      params = params.append('casepriority', priority);
    }

    if (areaname) {
      params = params.append('areaname', areaname);
    }

    if (POC) {
      params = params.append('poc', POC);
    }
    
  
    return this.httpClient
      .get<CaseVO>(this.moduleURL, { params: params })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

    
  }

  public searchCases(option:number,text:string,page:string,size:string) {

    let params = new HttpParams();

   

    if(option == 1)
    params = params.append('id', text);
    else if(option == 2)
    params = params.append('benname', text);
    else if(option == 3)
    params = params.append('benphone', text);
    else if(option == 4)
    params = params.append('status', text);
    else if(option == 5)
    params = params.append('areaname', text);
    
    params = params.append('validate', "true");
    params = params.append('page', page);
    params = params.append('size', size);
    
  
    return this.httpClient
      .get<CaseVO>(this.moduleURL+"/search", { params: params })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

    
  }

  public groupByPOC(areaname?: string,status?:string,priority?:string) {

    let url:string = "/group/poc";
    let params = new HttpParams();
    
    if(status)
    params = params.append('status', status);
    if(priority)
    params = params.append('priority', priority);
    if(areaname)
    params = params.append('areaname', areaname);
    return this.httpClient
    .get<GroupVO>(this.moduleURL + url, { params: params })
    .pipe(
      retry(2),
      catchError(this.handleError)
    )

  }

  public groupByArea(poc?: string,status?:string,priority?:string) {

    let url:string = "/group/area";
    let params = new HttpParams();
    
    if(status)
    params = params.append('status', status);
    if(priority)
    params = params.append('priority', priority);
    if(poc)
    params = params.append('poc', poc);
    return this.httpClient
    .get<GroupVO>(this.moduleURL + url, { params: params })
    .pipe(
      retry(2),
      catchError(this.handleError)
    )

  }

  public groupByStatus(poc?: string,area?:string,priority?:string) {

    let url:string = "/group/status";
    let params = new HttpParams();
    
    if(area)
    params = params.append('area', area);
    if(priority)
    params = params.append('priority', priority);
    if(poc)
    params = params.append('poc', poc);
    return this.httpClient
    .get<GroupVO>(this.moduleURL + url, { params: params })
    .pipe(
      retry(2),
      catchError(this.handleError)
    )

  }

  public groupByPriority(poc?: string,status?:string,area?:string) {

    let url:string = "/group/priority";
    let params = new HttpParams();
    
    if(area)
    params = params.append('area', area);
    if(status)
    params = params.append('status', status);
    if(poc)
    params = params.append('poc', poc);
    return this.httpClient
    .get<GroupVO>(this.moduleURL + url, { params: params })
    .pipe(
      retry(2),
      catchError(this.handleError)
    )

  }

  public listCallerCategory() {

    let url:string = "/meta/1";
    return this.httpClient
    .get<MetaVO>(this.moduleURL + url)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )

  }

  public listCaseCategory() {

    let url:string = "/meta/2";
    return this.httpClient
    .get<MetaVO>(this.moduleURL + url)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )

  }

  public listCards() {

    let url:string = "/meta/4";
    return this.httpClient
    .get<MetaVO>(this.moduleURL + url)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )

  }

  public listPriority() {

    let url:string = "/meta/3";
    return this.httpClient
    .get<MetaVO>(this.moduleURL + url)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )

  }


}

