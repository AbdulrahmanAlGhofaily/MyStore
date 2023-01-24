import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  currentProduct: Product;

  constructor(private http: HttpClient) {
    this.currentProduct = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: '',
    };
  }

  /**
   *
   * @returns An array of products.
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:4200/assets/data.json');
  }
}
