import { Component, Input, OnInit } from '@angular/core';
import { LocalDataService } from '../../../services/local-data.service';
import { ProductIndex } from '../../../interfaces/Products';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { ToastGeneratorService } from '../../../services/toast-generator.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  constructor(
    private local: LocalDataService,
    private routeParam: ActivatedRoute,
    private data: DataService,
    private route: Router
  ) {}

  id: string = '';
  quantity: number = 1;
  product = '';

  ngOnInit() {
    this.routeParam.queryParams.subscribe((params) => {
      console.log(params);
      this.id = params['id'];
      this.getProductDetail();
    });
  }

  addWithQuantity() {
    this.local.storeProductWithQuantity({
      id: this.id,
      quantity: this.quantity,
    });
  }

  addToCart() {
    ToastGeneratorService.generate("Article ajouter au panier !",1000,"top","");
    this.addWithQuantity();
  }

  getProductDetail() {
    //this.id = "6066fd1a9d06a52b38cb4307";
    this.data
      .getMydiscountDataBy('/product/' + this.id + '?mode=numeral')
      .then((data) => {
        this.product = data.products[0];
        console.log(this.product);
      })
      .catch((err) => {});
  }

  home() {
    this.route.navigate(['/home']);
  }
}
