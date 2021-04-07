import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  constructor(private data: DataService) {}

  products = [];
  category = '';

  async ngOnInit() {
    await this.data.getMydiscountDataBy('/product/productBy/' + this.category).then((data)=>{this.products = data.products}).catch()
  }
}
