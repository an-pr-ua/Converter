import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ICurrency } from '../../models/product';
import { ProductService } from '../../services/product.services';
import { valutes } from '../../data/products';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() title: string;
  @Input() currencyNames: ICurrency[];
  @Input() selectedValue: string;
  input1: any;
  input2: any;
  selectValute1: any;
  selectValute2: any;
  selectId: string;
  selectValute1Rate: any;
  selectValute2Rate: any;

  constructor(
    public modalServices: ModalService,
    private productsService: ProductService
  ) {}

  ngOnInit(): void {
    this.productsService.getAll().subscribe((currencyNames: ICurrency[]) => {
      this.currencyNames = currencyNames;
      currencyNames.unshift(valutes);
    });
  }

  convertValue(selectedValue: any, selectId: string) {
    this.selectedValue = selectedValue;

    var inputQuantity1: any = this.input1 as unknown as number;
    var inputQuantity2: any = this.input2 as unknown as number;

    if (selectedValue !== undefined) {
      var selectValuteRate: number = this.currencyNames.find(
        (item) => item.cc === selectedValue
      )!.rate;

      if (selectId == 'select1') {
        this.selectValute1 = selectedValue;
        this.selectValute1Rate = selectValuteRate;
      } else {
        this.selectValute2 = selectedValue;
        this.selectValute2Rate = selectValuteRate;
      }
    }

    if (
      this.selectValute1 &&
      this.selectValute2 &&
      (inputQuantity1 || inputQuantity2)
    ) {
      const exchangeRate = this.selectValute1Rate! / this.selectValute2Rate!;
      if (selectId == 'select1' || selectId == 'input1') {
        const resultValue = exchangeRate * inputQuantity1;
        this.input2 = resultValue.toFixed(2);
      } else {
        const resultValue = inputQuantity2 / exchangeRate;
        this.input1 = resultValue.toFixed(2);
      }
    }
  }
}
