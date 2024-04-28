import { ComponentRef, EmbeddedViewRef, Injectable, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { PopoverComponent } from './popover/popover.component';
import { PopoverConfigView, PopoverView } from './popoverView.service';
import { PopoverData } from './interfaces/popopover.interface';

@Injectable()
export class PopoverControllerService {

  private viewContainerRef!: ViewContainerRef;

  constructor() { }


  createPopover<T>(component: Type<T> | TemplateRef<any>, props: PopoverData<T>){

    if(!this.viewContainerRef){
      throw new Error('No viewContainerRef set');
    }

    const modalComponent = this.viewContainerRef.createComponent(PopoverComponent);

    let componentToAdd: ComponentRef<T> | EmbeddedViewRef<any>;

    if(component instanceof TemplateRef ){
      componentToAdd = this.viewContainerRef.createEmbeddedView(component);
      modalComponent.instance.contentRef?.insert(componentToAdd);
    }else{
      componentToAdd = this.viewContainerRef.createComponent(component);
      modalComponent.instance.contentRef?.insert(componentToAdd.hostView);
    }


    const configView = new PopoverConfigView<T>();

    configView.dataPopover = props.data;

    let dataResponseModal: any;
    const closePopover = (dataResponse?: any) =>{
      dataResponseModal = dataResponse
      modalComponent.destroy();
    }

    configView.close = closePopover;

    modalComponent.injector.get(PopoverView).config = configView;

    if(componentToAdd instanceof ComponentRef){
      (componentToAdd as ComponentRef<T>).injector.get(PopoverView).config = configView;
      if(props.data){
        Object.keys(props.data).forEach((key)=>{
          if(Object.keys((componentToAdd as ComponentRef<T>).instance as Object).includes((key))){
            (componentToAdd as ComponentRef<T>).setInput(key, props.data![(key as keyof T)]);
          }
        });
      }
    }

    modalComponent.setInput('props', props.modalConfig);

    const onDismiss = () => {
      return new Promise<any>((resolve, _) => {
        modalComponent.onDestroy(()=>{
          resolve(dataResponseModal);
        });
      });
    }

    return { closePopover, onDismiss };

  }

  set setConfigViewContainer(viewContainerRef: ViewContainerRef){
    this.viewContainerRef = viewContainerRef;
  }

}
