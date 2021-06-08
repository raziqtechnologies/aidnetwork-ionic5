import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { firestore } from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  increment: any;

  ticketidkey: string = "Nx9KkuuGdRCdEkRuCqjl";

  constructor(public db: AngularFirestore, public firebase: AngularFireModule) { }

  getAvatars() {
    return this.db.collection('/avatar').valueChanges()
  }

  getUser(userKey) {
    return this.db.collection('ApprovedUser').doc(userKey).snapshotChanges();
  }


  private getIdGen(idkey) {
    return this.db.collection('idmanager').doc(this.ticketidkey).snapshotChanges();
  }

  updateUser(userKey, value) {
    return this.db.collection('ApprovedUser').doc(userKey).set(value);
  }

  deleteUser(userKey) {
    return this.db.collection('ApprovedUser').doc(userKey).delete();
  }

  getUsers() {
    this.generateUniqueCaseId();
    return this.db.collection('ApprovedUser').snapshotChanges();
  }

  searchUsers(searchValue) {
    return this.db.collection('ApprovedUser', ref => ref.where('emailid', '>=', searchValue)
      .where('emailid', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchUsersByEmail(value) {
    return this.db.collection('ApprovedUser', ref => ref.where('emailid', '==', value)).snapshotChanges();
  }


  createUser(value) {
    return this.db.collection('ApprovedUser').add(value);
  }

  //check
  public generateUniqueCaseId() {

    var trans = this.db.firestore.batch();
    //pls check this line
    //this.db.collection('idmanager').doc(this.ticketidkey).update({ticketid: firestore.FieldValue.increment(1)});
    this.db.collection('idmanager').doc(this.ticketidkey).valueChanges().subscribe(result => {


      console.log(result);


    })

    trans.commit();

  }

  pad(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
}
