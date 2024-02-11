import { Component, Input } from '@angular/core';
import { ICurrency } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent {
  @Input() product: ICurrency;

  details = false;

  constructor() {}
}
