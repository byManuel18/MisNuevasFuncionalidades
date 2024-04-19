import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalView {
  constructor(@Inject(ModalConfigView) public config: ModalConfigView) {}
}

@Injectable({
  providedIn: 'root'
})
export class ModalConfigView {
  id:string = '';
  close!: (dataResponse?: any) => void;
}
