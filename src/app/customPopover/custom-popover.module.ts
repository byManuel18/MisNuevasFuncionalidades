import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './popover/popover.component';
import { PopoverControllerService } from './popover-controller.service';



@NgModule({
  declarations: [PopoverComponent],
  imports: [
    CommonModule
  ],
  exports:[],
  providers:[PopoverControllerService]
})
export class CustomPopoverModule { }
