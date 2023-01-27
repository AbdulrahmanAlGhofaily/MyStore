import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent {
  @Input() product: Product;
  @Output() productAdded = new EventEmitter();
  amount: number = 1;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.product = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: '',
    };
    this.amount = 1;
  }

  increase() {
    this.amount++;
  }

  decrease() {
    if (this.amount !== 1) {
      this.amount--;
    }
  }

  showDetails() {
    this.productService.currentProduct = {
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      url: this.product.url,
      description: this.product.description,
    };
  }

  submitForm() {
    this.cartService.addProductToCart(this.product, this.amount);
    this.productAdded.emit();
  }
}
