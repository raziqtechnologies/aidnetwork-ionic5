import { Injectable } from '@angular/core';

import { from, of, zip, Observable } from 'rxjs';
import { groupBy, reduce, map, mergeMap } from 'rxjs/operators';
//import { CacheService } from "ionic-cache";
import { AlertController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import * as _ from "lodash";
import * as cities from "../../assets/cities.json";

import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UtilService {



  private citydata: any;

  constructor(public db: AngularFirestore, private alertController: AlertController,private http: HttpClient,private loadingController: LoadingController) {
    // if(this.cache.itemExists("cities"))
    // {
    //   this.citydata = cache.getItem("cities");
    // }
    // else{

    // }

  }

  private isLoading:boolean;

  async readFile()
  {
    
   fetch('./assets/cities.json').then(val => val.json().then(json =>{
      console.log(json);
   }))
    
  
  }

  getCitiesByState(state: string) {

  }

  //  fetch('./assets/cities.json').then(res => res.json())
  // //.then(json => {
  //   groupBy(p => p['state'], p => p['name']),
  //   mergeMap(group$ =>
  //     group$.pipe(reduce((acc, cur) => [...acc, cur], [`${group$.key}`]))
  //   ),
  //   map(arr => ({ state: arr[0], values: arr.slice(1) }))
  getStates() {
    
    return from(cities.splice(0,1219)).pipe(
      groupBy(p => p['state'], p => p['name']),
      mergeMap(group$ =>
      group$.pipe(reduce((acc, cur) => [...acc, cur], [`${group$.key}`]))
      ),
    map(arr => ({ state: arr[0], values: arr.slice(1) })))
    
  }



   exportJSONDocument() {
    let data: any = [];
    fetch('./assets/areas.json').then(res => res.json())
      .then(async json => {
        const batches = _.chunk(json, 500).map(areaChucks => {
          var batch = this.db.firestore.batch();
          areaChucks.forEach(eachArea => {
            const userRef = this.db.collection('Areas').doc(this.randomString(10).toUpperCase()).ref;
            batch.set(userRef, eachArea);
          });
          console.log("500 Records Created");
          return batch.commit();
        }
        )
        await Promise.all(batches);
      });







  }
  randomString(length: number) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }
  async presentAlert(message: string, title?: string, module?: string) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: module,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async loadingPresent() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Please wait ...',
      spinner: 'circles' ,
      duration: 5000
    }).then(a => {
      a.present().then(() => {
       
        if (!this.isLoading) {
          a.dismiss().then();
        }
      });
    });
  }

  async loadingDismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('loading dismissed'));
  }


}
