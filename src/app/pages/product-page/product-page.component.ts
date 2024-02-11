import { Component } from '@angular/core';
import { ICurrency } from '../../models/product';
import { Observable, tap } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { ProductService } from '../../services/product.services';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  title = 'Інформація';
  loading = false;
  products$: Observable<ICurrency[]>;
  term = '';
  products: ICurrency[];
  constructor(
    private productsService: ProductService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.products$ = this.productsService
      .getAll()
      .pipe(tap(() => (this.loading = false)));
  }
}
