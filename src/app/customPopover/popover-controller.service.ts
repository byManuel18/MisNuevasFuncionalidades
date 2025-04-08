import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EmbeddedViewRef,
  inject,
  Injectable,
  Injector,
  TemplateRef,
  Type,
} from '@angular/core';
import { PopoverComponent } from './popover/popover.component';
import { PopoverData } from './interfaces/popopover.interface';
import { POPOVER_INSTANCE } from './tokens/popover.token';

@Injectable({
  providedIn: 'root',
})
export class PopoverControllerService {
  private appRef: ApplicationRef = inject(ApplicationRef);
  private injector: Injector = inject(Injector);

  createPopover<T>(component: Type<T> | TemplateRef<T>, props: PopoverData<T>) {
    let closePopover: (data?: unknown) => void;

    const newInjector = Injector.create({
      providers: [
        {
          provide: POPOVER_INSTANCE,
          useValue: {
            data: props.data,
            dismiss: (data?: unknown) => closePopover(data),
          },
        },
      ],
      parent: this.injector,
    });

    const popoverRef = createComponent(PopoverComponent, {
      environmentInjector: this.appRef.injector,
      elementInjector: newInjector,
    });

    closePopover = (dataResponse?: any) => {
      dataResponseModal = dataResponse;
      this.appRef.detachView(popoverRef.hostView);
      popoverRef.destroy();
    };

    this.appRef.attachView(popoverRef.hostView);

    const domElem = (popoverRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    let componentToAdd: ComponentRef<T> | EmbeddedViewRef<any>;
    let dataResponseModal: any;

    popoverRef.setInput('props', props.modalConfig);

    if (component instanceof TemplateRef) {
      componentToAdd = component.createEmbeddedView(
        props.data as T,
        newInjector
      );
      popoverRef.instance.contentRef()?.insert(componentToAdd);
    } else {
      componentToAdd = createComponent(component, {
        environmentInjector: this.appRef.injector,
        elementInjector: newInjector,
      });

      if (props.data) {
        Object.keys(props.data).forEach((key) => {
          if (
            Object.keys(
              (componentToAdd as ComponentRef<T>).instance as Object
            ).includes(key)
          ) {
            (componentToAdd as ComponentRef<T>).setInput(
              key,
              props.data![key as keyof T]
            );
          }
        });
      }

      popoverRef.instance.contentRef()?.insert(componentToAdd.hostView);
    }

    const onDismiss = () => {
      return new Promise<unknown>((resolve) => {
        popoverRef.onDestroy(() => {
          resolve(dataResponseModal);
        });
      });
    };

    return { closePopover, onDismiss };
  }
}
