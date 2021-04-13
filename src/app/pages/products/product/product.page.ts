import { Component, Input, OnInit } from '@angular/core';
import { LocalDataService } from '../../../services/local-data.service';
import { ProductIndex } from '../../../interfaces/Products';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  constructor(
    private local: LocalDataService,
    private routeParam: ActivatedRoute,
    private data: DataService
  ) {}

  id: string = '';
  quantity: number = 1;

  ngOnInit() {
    this.routeParam.queryParams.subscribe((params) => {
      console.log(params);
      this.id = params['id'];
    });
    this.getProductDetail()
  }

  addWithQuantity() {
    this.local.storeProductWithQuantity({
      id: this.id,
      quantity: this.quantity,
    });
  }

  getProductDetail() {
    this.id = "6066fd1a9d06a52b38cb4307";
    this.data
      .getMydiscountDataBy('/product/' + this.id + '?mode=numeral')
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {});
  }
}
