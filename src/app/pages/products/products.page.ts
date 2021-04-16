import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { RawProduct } from '../../interfaces/Products';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss',"../home/home.page.scss"],
})
export class ProductsPage implements OnInit {
  constructor(private data: DataService,private route:Router,private routeParam:ActivatedRoute) {}

  products: RawProduct[] = [];
  category = '';

home(){
   this.route.navigate(["/home"]);
 }

  async ngOnInit() {
    this.routeParam.queryParams.subscribe((params) => {
      console.log(params);
      this.category = params['category'];
    });
    await this.data
      .getMydiscountDataBy('/productBy/' + this.category)
      .then((data) => {
        
        this.products = data.products;
       // console.log(data.products[0])
        console.log(this.products)
      })
      .catch(()=>{});
  }
}
