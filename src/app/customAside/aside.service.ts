import { Injectable } from '@angular/core';
import { AsideComponent } from './aside/aside.component';

@Injectable({
  providedIn: 'root'
})
export class AsideService {

  private _asides: { [key:string]: AsideComponent } = {};

  constructor() { }

  addAside(idAside: string, aside: AsideComponent){
    if(!this.existAside(idAside)){
      this._asides[idAside] = aside;
    }
  }

  removeAside(idAside: string){
    if(this.existAside(idAside)){
      delete this._asides[idAside];
    }
  }

  existAside(idAside: string): boolean{
    return !!Object.keys(this._asides).find((k) => k === idAside);
  }

  toggleAside(idAside: string){
    if(this.existAside(idAside)){
      this._asides[idAside].toggleShow();
    }
  }
}
