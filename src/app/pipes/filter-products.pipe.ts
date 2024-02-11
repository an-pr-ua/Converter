import { ICurrency } from '../models/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProducts',
})
export class FilterProductsPipe implements PipeTransform {
  transform(products: ICurrency[], search: string): ICurrency[] {
    return products.filter((p) =>
      p.txt.toLowerCase().includes(search.toLowerCase())
    );
  }
}
