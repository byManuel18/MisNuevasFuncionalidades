import { Component, OnInit, ViewContainerRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTableModule } from './customTable/custom-table.module';
import { ColumType, CustomTable } from './customTable/interfaces/table.interface';
import { CustomMenuModule } from './customMenu/custom-menu.module';
import { Menu } from './customMenu/interfaces/menu.interface';
import { RouterOutlet } from '@angular/router';
import { CustomAsideModule } from './customAside/custom-aside.module';
import { AsideService } from './customAside/aside.service';
import { CustomModalModule } from './customModal/custom-modal.module';
import { ModalService } from './customModal/modal.service';
import { PruebaModalComponent } from './prueba-modal/prueba-modal.component';

interface Ejemplo {
  nombre: string;
  domicilio: {
    calle: string;
    numero: string;
    cp: string;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CustomTableModule,
    CustomMenuModule,
    CustomAsideModule,
    CustomModalModule,
    PruebaModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  viewContainerRef = inject(ViewContainerRef);
  asideService= inject(AsideService);
  modalservice= inject(ModalService);

  pruebadeTabla: CustomTable<Ejemplo> = {
    data: [{
      nombre: 'Bea',
      domicilio: {
        calle: 'Chaparro',
        cp: '14014',
        numero: '6'
      }
    },
    {
      nombre: 'Manu',
      domicilio: {
        calle: 'Chaparro',
        cp: '14014',
        numero: '6'
      }
    },],
    colums: [
      {
        property: 'nombre',
        show: true,
        title: 'Nombre',
        type: {type: ColumType.text}
      },
      {
        property: 'domicilio.calle',
        show: true,
        title: 'Calle',
        type: {type: ColumType.text}
      },
      {
        property: 'domicilio.cp',
        show: true,
        title: 'Cp',
        type: {type: ColumType.text}
      },
      {
        property: 'domicilio.numero',
        show: true,
        title: 'Numero',
        type: {type: ColumType.text}
      },
    ]
  };

  myMenu: Menu = {
    menuItems: [
      {
        title: 'a',
        link: 'alink',
        items: [{
          title: 'a-1',
        link: 'alink',
        },{
          title: 'a-2',
        link: 'alink',
        },{
          title: 'a-3',
        link: 'alink',
        },],
        icon: 'fa-solid fa-truck-fast'
      },
      {
        title: 'b',
        link: 'blink',
        items: [{
          title: 'b-1',
        link: 'blink',
        },{
          title: 'b-2',
        link: 'blink',
        },{
          title: 'b-3',
        link: 'blink',
        },]
      },
      {
        title: 'c',
        link: 'clink',
        items: [{
          title: 'c-1',
        link: 'clink',
        },{
          title: 'c-2',
        link: 'clink',
        },{
          title: 'c-3',
        link: 'clink',
        items:[
          {
            title: 'c-3-1',
          link: 'c31link',
          },{
            title: 'c-3-2',
          link: 'c32link',
          }
        ]
        },]
      },
      {
        title: 'd',
        link: 'link',
      },
    ]
  }

  items = [
    { title: 'Item 1', content: 'Contenido del item 1' },
    { title: 'Item 2', content: 'Contenido del item 2' },
    { title: 'Item 3', content: 'Contenido del item 3' }
  ];


  ngOnInit(): void {
    this.modalservice.setConfigViewContainer(this.viewContainerRef);
  }

  pruebaToggle(id: string){
    this.asideService.toggleAside(id);
  }

  showModal(){
    this.modalservice.openModal(PruebaModalComponent,{backDropDismmiss: true}).onDismiss().then((data)=>{
      console.log(data);
    })
  }
}
