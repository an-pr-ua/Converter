import { Component, Input } from '@angular/core';
import { ICurrency } from '../../models/product';
import { ProductService } from '../../services/product.services';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  @Input() products: ICurrency[];
  text: string[] = [];

  constructor(private productsService: ProductService) {}

  ngOnInit(): void {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;

      this.products.forEach((product: ICurrency) => {
        this.text.push(product.cc + ': ' + product.rate);
      }, this);
      let valuteSearch: any;
      const arrValuteCours: string[] = [];
      let arrValute: string[] = ['USD', 'EUR'];
      arrValute.forEach((valuteNav: string) => {
        valuteSearch = products
          .find((product) => product.cc === valuteNav)!
          .rate.toFixed(2);
        arrValuteCours.push(valuteNav + '-' + valuteSearch + '<br />');
      });

      const valuteCours: any = document.querySelector('#valuteCours');
      if (valuteCours) {
        valuteCours.innerHTML = arrValuteCours.join('');
      }

      const line = document.querySelector('marquee');
      if (line) {
        line.innerHTML = this.text.join(' | ');
      }
    });
  }
}
