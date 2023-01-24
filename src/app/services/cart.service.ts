import { Injectable } from '@angular/core';
import { CartItem } from '../models/CartItem';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: CartItem[] = [];
  name: string = '';
  address: string = '';
  card: string = '';

  constructor() {}

  getCart() {
    return this.cart;
  }

  getTotal(): number {
    let total = 0;
    this.cart.forEach((i) => {
      total += i.price * i.amount;
    });
    total = Math.round(total * 100) / 100;
    return total;
  }

  /**
   * This function adds products to the cart.
   * @param product product being add to the cart
   * @param amount the amount of the product
   */
  addProductToCart(product: Product, amount: number): void {
    const productExist = this.cart.some((p) => p.id === product.id);

    if (!productExist) {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        url: product.url,
        description: product.description,
        amount,
      });
    } else {
      this.cart.forEach((p) => {
        if (p.id === product.id) {
          p.amount += amount;
        }
      });
    }
  }

  updateItemAmount(item: CartItem, operation: string) {
    const itemIndex = this.cart.indexOf(item);
    if (operation === 'inc') {
      this.cart[itemIndex].amount++;
    } else if (operation === 'dec') {
      this.cart[itemIndex].amount--;
    }
  }

  deleteItem(product: CartItem) {
    const itemIndex = this.cart.indexOf(product);
    if (itemIndex > -1) {
      this.cart.splice(itemIndex, 1);
    }
  }

  clearCart() {
    this.cart = [];
  }
}
