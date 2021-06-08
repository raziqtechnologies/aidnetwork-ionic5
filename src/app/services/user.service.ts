import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { UserVO } from './models/uservo';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { BaseService } from './baseservice';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{

  moduleURL:string = this.baseURL + "/user";

  constructor(public db: AngularFirestore, public firebase: AngularFireModule,private  httpClient : HttpClient,private util: UtilService) { 
    super();
  }

   
 

  public addUser(user) {

      user.createdate = new Date().getTime();

      return this.httpClient
      .post(this.moduleURL,user)
       .toPromise();

    
    
  }

  public updateUser(user) {
    user.createdate = new Date().getTime();

    return this.httpClient
    .post(this.moduleURL,user)
    .toPromise();

  }

  // Get students data
  listUsers(searchTerm: string): Observable<UserVO> {

    let params = new HttpParams();
    params = params.append('firstname', searchTerm);
    return this.httpClient
      .get<UserVO>(this.moduleURL,{params:params})
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  

  getUser(email: string) {
    let params = new HttpParams();
    params = params.append('emailid', email);
    return this.httpClient
      .get<UserVO>(this.moduleURL,{params:params})
      .toPromise();

  }

 

  searchUserByRole(role: string): Observable<UserVO> {

    let params = new HttpParams();
    params = params.append('role', role);
    return this.httpClient
      .get<UserVO>(this.moduleURL,{params:params})
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }

  getChildUsers(parent: string): Observable<UserVO> {

    let params = new HttpParams();
    params = params.append('parentid', parent);
    return this.httpClient
      .get<UserVO>(this.moduleURL,{params:params})
      .pipe(
        retry(2),
        catchError(this.handleError)
      )


  }

}
