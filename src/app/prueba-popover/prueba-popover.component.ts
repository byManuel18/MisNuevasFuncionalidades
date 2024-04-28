import { Component, Inject, Input } from '@angular/core';
import { PopoverView } from '../customPopover/popoverView.service';

@Component({
  selector: 'app-prueba-popover',
  standalone: true,
  imports: [],
  templateUrl: './prueba-popover.component.html',
  styleUrl: './prueba-popover.component.scss'
})
export class PruebaPopoverComponent {

  @Input() title: string = '';

  constructor(@Inject(PopoverView) private modalView: PopoverView<PruebaPopoverComponent>){

  }


  closePopover(){
    this.modalView.config.close({pruebaPopoverComponent: 'Cerrado dese Aqui'});
  }


}
