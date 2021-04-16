import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ProductIndex } from '../interfaces/Products';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LocalDataService {
  constructor(private platform: Platform, private storage: NativeStorage,private route:Router) {}


  async disconnect(){
    return await this.clearToken().then(()=>{this.route.navigate(["/login"])}) ;
  }

  async goHome(){
    return  await this.route.navigate(['/home']).then((t)=>{console.log(t)}).catch((err)=>{console.log(err)});
  }

  async clear() {
    if (this.platform.is('desktop')) {
      localStorage.setItem('Mydiscount_cart', null);
    } else {
      await this.storage.setItem('Mydiscount_cart', null);
    }
  }

  async clearToken(){
    if (this.platform.is('desktop')) {
      localStorage.setItem('token', null);
    } else {
      await this.storage.setItem('token', null);
    }
  }

  async getCart() {
    var products: ProductIndex[] = [];
    if (this.platform.is('desktop')) {
      const ls = <ProductIndex[]>(
        JSON.parse(localStorage.getItem('Mydiscount_cart'))
      );
      products = ls === null ? [] : ls;
    } else {
      const s = <ProductIndex[]>await this.storage.getItem('Mydiscount_cart');
      products = (s === null || s === undefined) ? [] : s;
    }

    return products;
  }

  async removeProductWithQuantity(product: ProductIndex) {
    var products: ProductIndex[] = await this.getCart();
    var results = products.filter((p) => {
      if (p.id === product.id) {
        p.quantity =
          product.quantity > 0 && product.quantity < p.quantity
            ? p.quantity - product.quantity
            : 0;
      }
      if (p.quantity > 0) {
        return p;
      }
    });

    if (results.length === 0) {
      results = null;
    }
    if (this.platform.is('desktop')) {
      localStorage.setItem('Mydiscount_cart', JSON.stringify(results));
    } else {
      this.storage.setItem('Mydiscount_cart', results);
    }
  }

  async storeProductWithQuantity(product: ProductIndex) {
    console.log('test');
    var products: ProductIndex[] = [];
    if (this.platform.is('desktop')) {
      products =
        <ProductIndex[]>JSON.parse(localStorage.getItem('Mydiscount_cart')) ===
        null
          ? []
          : <ProductIndex[]>JSON.parse(localStorage.getItem('Mydiscount_cart'));
    } else {
      products =
        <ProductIndex[]>await this.storage.getItem('Mydiscount_cart') ===
          null ||
        <ProductIndex[]>await this.storage.getItem('Mydiscount_cart') ===
          undefined
          ? []
          : <ProductIndex[]>await this.storage.getItem('Mydiscount_cart');
    }

    const result = products.find((p) => {
      if (p.id === product.id) {
        p.quantity =
          product.quantity > 1 ? p.quantity + product.quantity : p.quantity + 1;
        return p;
      }
    });

    if (result === undefined || result === null) {
      products.push({ id: product.id, quantity: product.quantity });
    }

    if (this.platform.is('desktop')) {
      localStorage.setItem('Mydiscount_cart', JSON.stringify(products));
    } else {
      this.storage.setItem('Mydiscount_cart', products);
    }
  }
}
