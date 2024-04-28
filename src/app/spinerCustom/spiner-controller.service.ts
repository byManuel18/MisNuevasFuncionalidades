import { Injectable, inject } from '@angular/core';
import { ModalService } from '../customModal/modal.service';
import { SpinerComponent } from './spiner/spiner.component';

@Injectable()
export class SpinerControllerService {

  private spinerOpen: boolean = false;
  private spinnerOpenCount: number = 0;
  private spinnerToClose?: () => void;

  private modalService = inject(ModalService);

  openSpiner(){
    if(!this.spinerOpen){
      this.spinerOpen = true;
      const { closeModal, onDismiss } = this.modalService.openModal(SpinerComponent,{modalConfig: {backDropDismmiss: false}}, true);
      this.spinnerToClose = closeModal;
      onDismiss().then(()=>{
        this.spinerOpen = false;
        this.spinnerToClose = undefined;
      });
    }
    this.spinnerOpenCount++;
  }

  closeSpiner(){
    if(this.spinerOpen){
      this.spinnerOpenCount--;
      if(this.spinnerOpenCount <= 0){
        this.spinnerOpenCount = 0;
        if(this.spinnerToClose){
          this.spinnerToClose()
        }
      }
    }
  }
}
