import { ApplicationRef, ComponentRef, createComponent, EmbeddedViewRef, inject, Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { PopoverComponent } from './popover/popover.component';
import { PopoverConfigView, PopoverView } from './popoverView.service';
import { PopoverData } from './interfaces/popopover.interface';

@Injectable({
  providedIn: 'root'
}
)
export class PopoverControllerService {

  private appRef: ApplicationRef= inject(ApplicationRef);
  private injector: Injector = inject(Injector);

  createPopover<T>(component: Type<T> | TemplateRef<T>, props: PopoverData<T>) {

    const popoverRef = createComponent(PopoverComponent, {
      environmentInjector: this.appRef.injector,
      elementInjector: this.injector,
    });

    this.appRef.attachView(popoverRef.hostView);

    const domElem = (popoverRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    const configView = new PopoverConfigView<T>();
    configView.dataPopover = props.data;

    let componentToAdd: ComponentRef<T> | EmbeddedViewRef<any>;
    let dataResponseModal: any;

    const closePopover = (dataResponse?: any) => {
      dataResponseModal = dataResponse;
      this.appRef.detachView(popoverRef.hostView);
      popoverRef.destroy();
    };

    configView.close = closePopover;

    popoverRef.injector.get(PopoverView).config = configView;
    popoverRef.setInput('props', props.modalConfig);

    if (component instanceof TemplateRef) {
      componentToAdd = component.createEmbeddedView(props.data as T);

      popoverRef.instance.contentRef?.insert(componentToAdd);
    } else {
      componentToAdd = createComponent(component, {
        environmentInjector: this.appRef.injector,
        elementInjector: this.injector,
      });

      if(props.data){
        Object.keys(props.data).forEach((key)=>{
          if(Object.keys((componentToAdd as ComponentRef<T>).instance as Object).includes((key))){
            (componentToAdd as ComponentRef<T>).setInput(key, props.data![(key as keyof T)]);
          }
        });
      }

      popoverRef.instance.contentRef?.insert(componentToAdd.hostView);

      componentToAdd.injector.get(PopoverView).config = configView;
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

