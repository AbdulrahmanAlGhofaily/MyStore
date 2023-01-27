import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/CartItem';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  orderForm!: FormGroup;
  submitted: boolean = false;
  isLessThanSix = false;
  errorMessage = 'Address must be at least 6 characters.';

  constructor(
    private cartService: CartService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    // Declare variables
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

    // Validations
    this.orderForm = this.formBuilder.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      addressControl: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
      cc: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
          Validators.pattern('^(0|[1-9][0-9]*)$'),
        ],
      ],
    });
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

  addressValueChange(value: string) {
    if (value.length < 6) {
      this.isLessThanSix = true;
    } else if (value.length >= 6) {
      this.isLessThanSix = false;
    }
  }

  submitForm() {
    this.submitted = true;
    if (this.orderForm.invalid) {
      return;
    }
    this.cartService.name = this.name;
    this.cartService.address = this.address;
    this.cartService.card = this.card;
    this.router.navigate(['/checkout']);
  }
}
