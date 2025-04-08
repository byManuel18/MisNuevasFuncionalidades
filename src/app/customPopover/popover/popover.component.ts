import {
  Component,
  ElementRef,
  Renderer2,
  ViewContainerRef,
  ViewEncapsulation,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { PopoverConfig } from '../interfaces/popopover.interface';
import { POPOVER_INSTANCE } from '../tokens/popover.token';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'custom-popover',
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.ShadowDom,
  animations: [
    trigger('fadePopover', [
      state('open', style({ opacity: 1, transform: 'scale(1)' })),
      state('closed', style({ opacity: 0, transform: 'scale(0.95)' })),
      transition('open => closed', animate('150ms ease-in')),
      transition('void => open', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('150ms ease-out'),
      ]),
    ]),
  ],
})
export class PopoverComponent {
  container = viewChild.required<ElementRef<HTMLDivElement>>('container');
  arrow = viewChild.required<ElementRef<HTMLDivElement>>('arrow');
  contentRef = viewChild.required('contentRef', { read: ViewContainerRef });
  animationDone = output<unknown>();

  props = input.required<PopoverConfig>();

  render = inject(Renderer2);

  state = signal<'open' | 'closed'>('open');

  private closeData: unknown;

  private popoverInstance = inject(POPOVER_INSTANCE);
  constructor() {
    effect(() => {
      if (
        this.props() &&
        this.container() &&
        this.arrow() &&
        this.contentRef()
      ) {
        this.stylingPopover();
      }
    });
  }

  close(data?: any) {
    this.closeData = data;
    this.state.set('closed');
  }

  closePopover($event: MouseEvent) {
    const target: HTMLElement = $event.target as HTMLElement;
    if (
      target.classList.contains('popover-backdrop') &&
      this.props().backDropDismmiss
    ) {
      this.popoverInstance.dismiss({ onBackdropDismiss: true });
    }
  }

  onAnimationDone(event: any) {
    if (event.toState === 'closed') {
      this.animationDone.emit(this.closeData);
    }
  }

  stylingPopover() {
    if (this.props().event) {
      const elementEvent = this.props().event?.target as HTMLElement;
      const medidasEvent = elementEvent.getBoundingClientRect();
      const medidasContainer = (
        this.container().nativeElement as HTMLElement
      ).getBoundingClientRect();
      const medidasArrow = (
        this.arrow()?.nativeElement as HTMLElement
      ).getBoundingClientRect();

      const leftPosition =
        medidasEvent.left + medidasEvent.width / 2 - medidasContainer.width / 2;

      switch (this.props().position) {
        case 'bottom':
          this.render.setStyle(
            this.container().nativeElement,
            'top',
            `${
              medidasEvent.top + medidasEvent.height + medidasArrow.width / 2
            }px`
          );
          this.render.setStyle(
            this.container().nativeElement,
            'left',
            `${leftPosition}px`
          );
          this.render.setStyle(
            this.arrow().nativeElement,
            'top',
            `${-(medidasArrow.height + 5)}px`
          );
          this.render.addClass(this.arrow().nativeElement, 'arrowTopBot');
          break;
        case 'left':
          this.render.setStyle(
            this.container().nativeElement,
            'top',
            `${
              medidasEvent.top -
              (medidasContainer.height / 2 - medidasEvent.height / 2)
            }px`
          );
          this.render.setStyle(
            this.container().nativeElement,
            'left',
            `${
              medidasEvent.left -
              medidasContainer.width -
              medidasArrow.width / 2
            }px`
          );
          this.render.setStyle(
            this.arrow().nativeElement,
            'transform',
            'rotate(90deg)'
          );
          this.render.setStyle(this.arrow()?.nativeElement, 'right', '-20px');
          this.render.setStyle(
            this.arrow().nativeElement,
            'top',
            `${medidasContainer.height / 2 - medidasArrow.height}px`
          );
          break;
        case 'right':
          this.render.setStyle(
            this.container().nativeElement,
            'top',
            `${
              medidasEvent.top -
              (medidasContainer.height / 2 - medidasEvent.height / 2)
            }px`
          );
          this.render.setStyle(
            this.container().nativeElement,
            'left',
            `${
              medidasEvent.left + medidasEvent.width + medidasArrow.width / 2
            }px`
          );
          this.render.setStyle(
            this.arrow().nativeElement,
            'transform',
            'rotate(-90deg)'
          );
          this.render.setStyle(this.arrow()?.nativeElement, 'left', '-20px');
          this.render.setStyle(
            this.arrow().nativeElement,
            'top',
            `${medidasContainer.height / 2 - medidasArrow.height}px`
          );
          break;
        case 'top':
          this.render.setStyle(
            this.container().nativeElement,
            'top',
            `${
              medidasEvent.top -
              medidasContainer.height -
              medidasArrow.width / 2
            }px`
          );
          this.render.setStyle(
            this.container().nativeElement,
            'left',
            `${leftPosition}px`
          );
          this.render.setStyle(
            this.arrow().nativeElement,
            'transform',
            'rotate(180deg)'
          );
          this.render.setStyle(
            this.arrow().nativeElement,
            'bottom',
            `-${medidasContainer.height + medidasArrow.height / 2}px`
          );
          this.render.addClass(this.arrow().nativeElement, 'arrowTopBot');
          break;
      }
    } else {
      this.render.setStyle(this.arrow().nativeElement, 'display', 'none');
    }
  }
}
