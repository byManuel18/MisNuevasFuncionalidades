import { Component, inject, Input } from '@angular/core';
import { POPOVER_INSTANCE } from '../customPopover/tokens/popover.token';
@Component({
  selector: 'app-prueba-popover',
  standalone: true,
  imports: [],
  templateUrl: './prueba-popover.component.html',
  styleUrl: './prueba-popover.component.scss'
})
export class PruebaPopoverComponent {

  @Input() title: string = '';

  private popoverInstance = inject(POPOVER_INSTANCE);

  constructor(){

  }


  closePopover(){
    this.popoverInstance.dismiss({pruebaPopoverComponent: 'Cerrado dese Aqui'});
  }


}
