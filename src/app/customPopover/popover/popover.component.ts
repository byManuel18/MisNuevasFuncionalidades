import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, Renderer2, ViewChild, ViewChildren, ViewContainerRef, inject } from '@angular/core';
import { PopoverView } from '../popoverView.service';
import { PopoverConfig } from '../interfaces/popopover.interface';

@Component({
  selector: 'custom-popover',
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss'
})
export class PopoverComponent<T> implements AfterViewInit{

  @ViewChild('container', {static: true}) container!: ElementRef;
  @ViewChild('arrow', {static: true}) arrow!: ElementRef;
  @ViewChild('contentRef', { static: true, read: ViewContainerRef })
  contentRef!: ViewContainerRef;

  @Input() props!: PopoverConfig;

  render = inject(Renderer2);


  constructor(@Inject(PopoverView) private popoverView: PopoverView<T>){

  }
  ngAfterViewInit(): void {
    this.stylingPopover();
  }

  closePopover($event: MouseEvent){
    const target: HTMLElement = ($event.target as HTMLElement);
    if(target.classList.contains('popover-backdrop') && this.props.backDropDismmiss ){
      this.popoverView.config.close({ onBackdropDismiss: true });
    }

  }

  stylingPopover(){
    if(this.props.event){
      const elementEvent = (this.props.event.target as HTMLElement);
      const medidasEvent = elementEvent.getBoundingClientRect();
      const medidasContainer = (this.container.nativeElement as HTMLElement).getBoundingClientRect();
      const medidasArrow = (this.arrow.nativeElement as HTMLElement).getBoundingClientRect();

      const leftPosition = medidasEvent.left + (medidasEvent.width / 2) - (medidasContainer.width / 2);

      switch(this.props.position){
        case 'bottom' :
          this.render.setStyle(this.container.nativeElement,'top', `${medidasEvent.top + medidasEvent.height + (medidasArrow.width / 2)}px` );
          this.render.setStyle(this.container.nativeElement,'left', `${leftPosition}px` );
          this.render.setStyle(this.arrow.nativeElement,'top',`${-(medidasArrow.height + 5)}px`);
          this.render.addClass(this.arrow.nativeElement,'arrowTopBot');
          break;
        case 'left' :
          this.render.setStyle(this.container.nativeElement,'top', `${(medidasEvent.top)  - (medidasContainer.height / 2 - (medidasEvent.height / 2))}px` );
          this.render.setStyle(this.container.nativeElement,'left', `${medidasEvent.left - medidasContainer.width - (medidasArrow.width / 2)}px` );
          this.render.setStyle(this.arrow.nativeElement,'transform','rotate(90deg)');
          this.render.setStyle(this.arrow.nativeElement,'right','-20px');
          this.render.setStyle(this.arrow.nativeElement,'top',`${(medidasContainer.height / 2 - medidasArrow.height)}px`);
          break;
        case 'right' :
          this.render.setStyle(this.container.nativeElement,'top', `${(medidasEvent.top)  - (medidasContainer.height / 2 - (medidasEvent.height / 2))}px` );
          this.render.setStyle(this.container.nativeElement,'left', `${medidasEvent.left + medidasEvent.width + (medidasArrow.width / 2)}px` );
          this.render.setStyle(this.arrow.nativeElement,'transform','rotate(-90deg)');
          this.render.setStyle(this.arrow.nativeElement,'left','-20px');
          this.render.setStyle(this.arrow.nativeElement,'top',`${(medidasContainer.height / 2 - medidasArrow.height)}px`);
          break;
        case 'top' :
          this.render.setStyle(this.container.nativeElement,'top', `${medidasEvent.top - medidasContainer.height - (medidasArrow.width / 2)}px` );
          this.render.setStyle(this.container.nativeElement,'left', `${leftPosition}px` );
          this.render.setStyle(this.arrow.nativeElement,'transform','rotate(180deg)');
          this.render.setStyle(this.arrow.nativeElement,'bottom',`-${(medidasContainer.height + (medidasArrow.height / 2))}px`);
          this.render.addClass(this.arrow.nativeElement,'arrowTopBot');
          break;
      }
    } else{
      this.render.setStyle(this.arrow.nativeElement,'display','none');
    }
  }


}
