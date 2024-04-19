import { Component, Input, inject } from '@angular/core';
import { Menu } from '../interfaces/menu.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'custom-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  animations: [
    trigger('expandCollapse', [
      state('expanded', style({ height: '*' })),
      state('collapsed', style({ height: 0 })),
      transition('expanded <=> collapsed', animate('300ms ease-in-out'))
    ])
  ]
})
export class MenuComponent {

  @Input() menuConfig?: Menu;
  isOpen: boolean[] = [];

  router = inject(Router);

  toggleItem(index: number) {
    if(this.menuConfig!.menuItems.length > 0){
      this.isOpen[index] = !this.isOpen[index];
      this.isOpen = this.isOpen.map((value, i) => i === index ? value : false);
    }
  }
}
