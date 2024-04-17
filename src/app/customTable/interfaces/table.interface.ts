

export interface CustomTable<T> {
  title?: string;
  data: T[];
  colums: ColumTable<T>[];
  pagination?: Pagination;
  deleteOption?: boolean;
}

export enum ColumType {'img' , 'text' , 'date'};

export interface ColumTable<T> {
  title: string;
  type: TextColumn | DateColumn | ImgColumn<T>;
  backgroundColor?: string;
  show: boolean;
  property: NestedKeys<T>;
  editable?: boolean;
}

export interface TextColumn {
 type: ColumType.text;
}

export interface DateColumn {
  type: ColumType.date;
  format: string;
}

export interface ImgColumn<T> {
  type: ColumType.img;
  alt: string | NestedKeys<T>;
}

export interface Pagination {
  maxRows: number;
}

export type NestedKeys<T> = T extends object ? { [K in keyof T]:
  `${Exclude<K, symbol>}${"" | `.${NestedKeys<T[K]>}`}`
}[keyof T] : never;
