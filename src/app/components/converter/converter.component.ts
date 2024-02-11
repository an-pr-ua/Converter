import { valutes } from './../../data/products';
import { ProductService } from '../../services/product.services';
import { ICurrency } from './../../models/product';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
})
export class ConverterComponent implements OnInit {
  @Output() currencySelection = new EventEmitter<string>();
  selectionCurrency(value: string) {
    this.currencySelection.emit(value);
  }
  @Input() products: ICurrency[];
  currencyNames: ICurrency[];

  constructor(private productsService: ProductService) {}

  ngOnInit(): void {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
      this.products.unshift(valutes);
      const currencyNames: ICurrency[] = this.products.filter(
        (item) => item.r030 < 959 || item.r030 > 964
      );
      this.currencyNames = currencyNames;
    });
  }
}
