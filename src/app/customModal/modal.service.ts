import { ComponentRef, Injectable, Type, ViewContainerRef, inject } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { ModalConfig, ModalData } from './interfaces/modal.interface';
import { ModalView, ModalConfigView } from './modalData';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private viewContainerRef!: ViewContainerRef;

  private _openModals: Map<string, {modal: ComponentRef<ModalComponent>}> = new Map();

  constructor() { }

  openModal<T>(component: Type<T>, props: ModalData<T>, lockScroll: boolean = true) {

    if(!this.viewContainerRef){
      throw new Error('No viewContainerRef set');
    }

    const modalComponent = this.viewContainerRef.createComponent(ModalComponent);
    const componentToAdd = this.viewContainerRef.createComponent(component);

    modalComponent.instance.contentRef?.insert(componentToAdd.hostView);

    const modalID = this.generateModalId();

    const configView = new ModalConfigView();

    configView.id = modalID;

    this._openModals.set(modalID,{modal:modalComponent});

    if(lockScroll){
      document.body.style.overflow = 'hidden';
    }

    let dataResponseModal: any;
    const closeModal = (dataResponse?: any) =>{
      dataResponseModal = dataResponse
      modalComponent.destroy();
    }

    configView.close = closeModal;

    componentToAdd.injector.get(ModalView).config = configView;

    if(props.data){
      Object.keys(props.data).forEach((key)=>{
        if(Object.keys(componentToAdd.instance as Object).includes((key))){
          componentToAdd.setInput(key, props.data![(key as keyof T)]);
        }
      });
    }

    modalComponent.instance.modalID = modalID;

    const {data, ...rest} = props;
    modalComponent.setInput('props', rest);

    const onDismiss = () => {
      return new Promise<any>((resolve, _) => {
        modalComponent.onDestroy(()=>{
          this._openModals.delete(modalID);
          if(lockScroll){
            document.body.style.overflow = 'auto';
          }
          resolve(dataResponseModal);
        });
      });
    }

    return { closeModal, onDismiss };

  }

  private generateModalId(): string {
    return 'modal_' + Math.random().toString(36).substr(2, 9);
  }

  closeModal(modalId: string) {
    const modalData = this._openModals.get(modalId);
    if (modalData) {
      modalData.modal.destroy();
      this._openModals.delete(modalId);
    }
  }

  setConfigViewContainer(viewContainerRef: ViewContainerRef){
    this.viewContainerRef = viewContainerRef;
  }



}
