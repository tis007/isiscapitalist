import {Component, Input} from '@angular/core';
import {Product} from '../schema';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  standalone: true,
  styleUrl: './product.component.css'
})
export class ProductComponent {
  product: Product | undefined;
  @Input()
  set prod(value: Product) {
    this.product = value;
  }
}

