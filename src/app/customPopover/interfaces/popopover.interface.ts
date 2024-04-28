export type Position = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverConfig{
  backDropDismmiss?: boolean;
  event?: Event,
  position?: Position
}

export interface PopoverData<T> {
  data?: Partial<{ [K in keyof T]: T[K] }>;
  modalConfig: PopoverConfig;
}
