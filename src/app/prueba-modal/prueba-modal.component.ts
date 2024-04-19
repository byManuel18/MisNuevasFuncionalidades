import { Component, Inject, inject } from '@angular/core';
import { ModalView } from '../customModal/modalData';

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


  cerrar(){
    this.modalView.config.close({prueba: 'Aceptado'});
  }
}
