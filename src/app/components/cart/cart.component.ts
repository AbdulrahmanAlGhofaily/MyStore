import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/CartItem';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  host: {
    class: 'row',
  },
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  item: CartItem;
  total: number = 0;
  name: string;
  address: string;
  card: string;

  constructor(private cartService: CartService, private router: Router) {
    this.item = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: '',
      amount: 0,
    };
    this.name = '';
    this.address = '';
    this.card = '';
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    this.updateTotal();
  }

  updateTotal() {
    this.total = this.cartService.getTotal();
  }

  removeItem(item: CartItem): void {
    this.cartService.deleteItem(item);
    this.updateTotal();
    alert('Item has been removed from the cart.');
  }

  increase(item: CartItem) {
    this.cartService.updateItemAmount(item, 'inc');
    this.updateTotal();
  }

  decrease(item: CartItem) {
    if (item.amount !== 1) this.cartService.updateItemAmount(item, 'dec');
    this.updateTotal();
  }

  submitForm() {
    this.cartService.name = this.name;
    this.cartService.address = this.address;
    this.cartService.card = this.card;
    this.router.navigate(['/checkout']);
  }
}
