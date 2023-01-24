import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item-details',
  templateUrl: './product-item-details.component.html',
  styleUrls: ['./product-item-details.component.css'],
  host: {
    class: 'row',
  },
})
export class ProductItemDetailsComponent implements OnInit {
  product: Product;
  amount: number;

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

  ngOnInit(): void {
    this.product = {
      id: this.productService.currentProduct.id,
      name: this.productService.currentProduct.name,
      price: this.productService.currentProduct.price,
      url: this.productService.currentProduct.url,
      description: this.productService.currentProduct.description,
    };
  }

  increase() {
    this.amount++;
  }

  decrease() {
    if (this.amount !== 1) {
      this.amount--;
    }
  }

  submitForm() {
    this.cartService.addProductToCart(this.product, this.amount);
    alert('item has been added');
  }
}
