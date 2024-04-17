import { Component, Input } from '@angular/core';
import { CustomTable, NestedKeys } from '../interfaces/table.interface';
import { getPropertie } from '../../utils/getPropertie';

@Component({
  selector: 'custom-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T> {
  @Input() tableData?: CustomTable<T>;

  getPropertie(obj: T, key: NestedKeys<T>){
    return getPropertie(obj,key);
  }


}
