import {Component, Input} from '@angular/core';
import {Product} from '../schema';
import {WebserviceService} from '../webservice.service';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  standalone: true,
  styleUrl: './product.component.css'
})

export class ProductComponent {
  product: Product = new Product();
  protected server : string
  constructor(private service: WebserviceService) {
    this.server= service.server;
  }
  @Input()
  set prod(value: Product) {
    this.product = value;
  }
}

