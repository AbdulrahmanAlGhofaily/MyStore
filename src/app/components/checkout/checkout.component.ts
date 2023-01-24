import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  name: string;
  total: number;
  secretMsg: string;

  constructor(private cartService: CartService) {
    this.name = '';
    this.total = 0;
    this.secretMsg = '';
  }

  ngOnInit(): void {
    this.name = this.cartService.name;
    this.total = this.cartService.getTotal();
    if (this.total === 0) {
      this.secretMsg = `Your $${this.total} order IS NOT CONFIRMED 😡 GET SOMETHING!`;
    } else {
      this.secretMsg = `Your $${this.total} order is confirmed 😄`;
    }
    this.cartService.clearCart();
  }
}
