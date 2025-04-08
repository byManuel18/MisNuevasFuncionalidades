import { InjectionToken } from "@angular/core";

export interface PopoverInstance {
  data: unknown;
  dismiss: (data:unknown) => void;
}

export const POPOVER_INSTANCE = new InjectionToken<PopoverInstance>('POPOVER_INSTANCE');
