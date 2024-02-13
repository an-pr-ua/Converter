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
  input1: number;
  input2: number;
  selectValute1: string;
  selectValute2: string;
  selectId: string;
  selectValute1Rate: number;
  selectValute2Rate: number;

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

  convertValue(selectedValue: string, selectId: string) {
    this.selectedValue = selectedValue;

    var inputQuantity1: number = this.input1 as unknown as number;
    var inputQuantity2: number = this.input2 as unknown as number;

    if (selectedValue !== '') {
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
        this.input2 = Number(resultValue.toFixed(2));
      } else {
        const resultValue = inputQuantity2 / exchangeRate;
        this.input1 = Number(resultValue.toFixed(2));
      }
    }
  }
}
