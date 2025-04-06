import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { AsideService } from '../aside.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'custom-aside',
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
  animations: [
    trigger('expandCollapse', [
      state(
        'expanded-left',
        style({ transform: 'scaleX(1)', transformOrigin: 'left', width: '*' })
      ),
      state(
        'collapsed-left',
        style({ transform: 'scaleX(0)', transformOrigin: 'left', width: '0px' })
      ),
      state(
        'expanded-right',
        style({ transform: 'scaleX(1)', transformOrigin: 'right', width: '*' })
      ),
      state(
        'collapsed-right',
        style({
          transform: 'scaleX(0)',
          transformOrigin: 'right',
          width: '0px',
        })
      ),
      transition('* <=> *', animate('300ms ease-in-out')),
    ]),
  ],
})
export class AsideComponent implements OnInit, OnDestroy {
  @Input() idAside?: string;
  @Input() typeAside:
    | 'push-left'
    | 'push-right'
    | 'cover-left'
    | 'cover-right' = 'push-left';
  @Input() showAside: boolean = true;

  @ViewChild('asideElement', { static: true }) asideElement!: ElementRef;


  widthParent?: number;

  render = inject(Renderer2);
  asideService = inject(AsideService);

  @HostBinding('@expandCollapse') get getToggleDrawer(): string {
    if (this.showAside) {
      return this.typeAside === 'push-left' || this.typeAside === 'cover-left'
        ? 'expanded-left'
        : 'expanded-right';
    } else {
      return this.typeAside === 'push-left' || this.typeAside === 'cover-left'
        ? 'collapsed-left'
        : 'collapsed-right';
    }
  }

  @HostBinding('style.position') get hostPosition(): string | null {
    return this.isCoverType ? 'absolute' : null;
  }

  @HostBinding('style.top') get hostTop(): string | null {
    return this.isCoverType ? '0' : null;
  }

  @HostBinding('style.left') get hostLeft(): string | null {
    return this.typeAside === 'cover-left' ? '0' : null;
  }

  @HostBinding('style.right') get hostRight(): string | null {
    return this.typeAside === 'cover-right' ? '0' : null;
  }

  @HostBinding('style.z-index') get hostZIndex(): string | null {
    return this.isCoverType ? '1000' : null;
  }

  get isCoverType(): boolean {
    return this.typeAside === 'cover-left' || this.typeAside === 'cover-right';
  }

  ngOnInit(): void {
    if (!this.idAside) {
      throw new Error('No id');
    } else if (this.asideService.existAside(this.idAside)) {
      throw new Error('Aside exist');
    }

    this.asideService.addAside(this.idAside, this);
    if(this.isCoverType){
      if(this.asideElement.nativeElement?.parentElement?.parentElement){
        this.render.setStyle(this.asideElement.nativeElement?.parentElement?.parentElement, 'position', 'relative');
      }
    }
  }

  toggleShow() {
    this.showAside = !this.showAside;
  }

  ngOnDestroy(): void {
    if (this.idAside) {
      this.asideService.removeAside(this.idAside);
    }
  }
}
