import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { RawProduct } from '../../interfaces/Products';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  constructor(private data: DataService,private route:Router) {}

  products: RawProduct[] = [];
  category = '';

 

  async ngOnInit() {
    await this.data
      .getMydiscountDataBy('/product/productBy/' + this.category)
      .then((data) => {
        this.products = data.products;
      })
      .catch();
  }
}
