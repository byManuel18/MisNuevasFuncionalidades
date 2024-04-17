import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
import { AsideService } from '../aside.service';
import { AnimationBuilder, AnimationFactory, animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'custom-aside',
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
  animations: [
    // trigger('expandCollapse', [
    //   state('expanded', style({ width: '*' })),
    //   state('collapsed', style({ width: 0, overflow: 'hidden' })),
    //   transition('expanded <=> collapsed', animate('300ms ease-in-out'))
    // ])
    trigger('expandCollapse', [
      state('expanded', style({ opacity: 1 })),
      state('collapsed', style({ opacity: 0 })),
      transition('expanded <=> collapsed', animate('300ms ease-in-out'))
    ])
  ]
})
export class AsideComponent implements OnInit, OnDestroy{

  @Input()  idAside?:string;
  @Input() parentAside?: HTMLElement;
  @Input() typeAside: 'push' | 'cover-left' | 'cover-right' = 'push';
  @Input() showAside: boolean = true;

  widthParent?: number;

  render = inject(Renderer2);
  animationBuilder = inject(AnimationBuilder);
  asideService = inject(AsideService);

  ngOnInit(): void {

    if(!this.idAside){
      throw new Error('No id');
    }else if(this.asideService.existAside(this.idAside)){
      throw new Error('Aside exist');
    }

    if(!this.parentAside){
      throw new Error('No parent');
    }

    this.asideService.addAside(this.idAside,this);
    this.widthParent = this.parentAside?.offsetWidth
    if(this.typeAside === 'cover-left' || this.typeAside === 'cover-right'){
      this.render.setStyle(this.parentAside.parentElement,'position','relative');
      this.render.setStyle(this.parentAside,'position','absolute');
      this.render.setStyle(this.parentAside,this.typeAside === 'cover-left' ? 'left' : 'right','0');
    }
  }

  toggleShow(){
    if(this.showAside){
      this.widthParent = this.parentAside?.offsetWidth
    }
    this.showAside = !this.showAside;

    if(this.parentAside){
      const widthParent = this.widthParent + 'px';
      let animation: AnimationFactory = this.animationBuilder.build([
        style({ width: this.showAside ? '0px' : '*' }),
        style({overflow: this.showAside ? 'visible' : 'hidden' }),
        animate('300ms', style({ width: this.showAside ? widthParent : '0px' })),
        animate('300ms', style({overflow: this.showAside ? 'visible' : 'hidden' }),),
      ]);
      const player = animation.create(this.parentAside);
      player.play();
    }
  }

  ngOnDestroy(): void {
    if(this.idAside){
      this.asideService.removeAside(this.idAside);
    }
  }

}
