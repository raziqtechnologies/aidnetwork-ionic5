import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';




@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private afAuth: AngularFireAuth) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        return from(this.afAuth.auth.currentUser.getIdToken()).pipe(
            switchMap(token => {
               const headers = request.headers
                        .set('Authorization', 'Bearer ' + token)
                        .append('Content-Type', 'application/json');
               const requestClone = request.clone({
                 headers 
                });
              return next.handle(requestClone);
            })
           );
        
       

        return next.handle(request);
    }
}