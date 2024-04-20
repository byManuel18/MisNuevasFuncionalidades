export interface ModalConfig{
  backDropDismmiss?: boolean;
}

export interface ModalData<T> {
  data?: Partial<{ [K in keyof T]: T[K] }>;
  modalConfig: ModalConfig;
}
