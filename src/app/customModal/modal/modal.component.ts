import { Component, Input, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { ModalConfig } from '../interfaces/modal.interface';
import { ModalService } from '../modal.service';

@Component({
  selector: 'custom-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @ViewChild('contentRef', { static: true, read: ViewContainerRef })
  contentRef!: ViewContainerRef;

  @Input() props: ModalConfig = {
    backDropDismmiss: true
  };

  modalID!: string;

  modalService = inject(ModalService);

  onBackClick($event: MouseEvent) {
    if(this.props.backDropDismmiss){
      if(($event.srcElement as HTMLElement).classList.contains('modal')){
        this.modalService.closeModal(this.modalID);
      }
    }
  }

}
