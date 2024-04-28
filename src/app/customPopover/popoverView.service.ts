import { Inject, Injectable } from '@angular/core';
import { PopoverData } from './interfaces/popopover.interface';

@Injectable({
  providedIn: 'root'
})
export class PopoverView<T> {
  constructor(@Inject(PopoverConfigView) public config: PopoverConfigView<T>) {}
}

@Injectable({
  providedIn: 'root'
})
export class PopoverConfigView<T> {
  dataPopover?: Partial<{ [K in keyof T]: T[K] }>;
  close!: (dataResponse?: any) => void;
}
