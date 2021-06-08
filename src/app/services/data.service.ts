import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
 
@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  private data = [];
 
  constructor(private storage: Storage) { }
 
  setData(id, data) {
    this.data[id] = data;
  }
 
  getData(id) {
    return this.data[id];
  }

  setLocalData(id,data){
    return this.storage.set(id,data);
  }

  getLocalData(id)
  {
    return this.storage.get(id);
  }

  removeLocalData(id)
  {
    this.storage.remove(id);
  }

  clear()
  {
    this.storage.clear();
  }
}