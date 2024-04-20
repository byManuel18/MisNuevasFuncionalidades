import { Component, Inject, Input, TemplateRef, inject } from '@angular/core';
import { ModalView } from '../customModal/modalData';
import { ModalService } from '../customModal/modal.service';

@Component({
  selector: 'app-prueba-modal',
  standalone: true,
  imports: [],
  templateUrl: './prueba-modal.component.html',
  styleUrl: './prueba-modal.component.scss'
})
export class PruebaModalComponent {

  constructor(@Inject(ModalView) private modalView: ModalView){
  }

  @Input() titulo: string = "";

  modalservice = inject(ModalService);


  cerrar(){
    this.modalView.config.close({prueba: 'Aceptado'});
  }

  showMOdalWithTemplate(prueba: TemplateRef<any>){
    this.modalservice.openModal(prueba,{modalConfig:{backDropDismmiss: true}}).onDismiss().then((data)=>{
      console.log(data);
    })
  }
}
