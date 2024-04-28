import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinerComponent } from './spiner/spiner.component';
import { SpinerControllerService } from './spiner-controller.service';

@NgModule({
  declarations: [SpinerComponent],
  imports: [
    CommonModule
  ],
  providers: [SpinerControllerService]
})
export class SpinerCustomModule { }
