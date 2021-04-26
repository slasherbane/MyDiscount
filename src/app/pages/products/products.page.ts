import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { RawProduct } from '../../interfaces/Products';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss',"../home/home.page.scss"],
})
export class ProductsPage implements OnInit {
  constructor(private data: DataService,private route:Router,private routeParam:ActivatedRoute,private loader:LoadingController) {}

  products: RawProduct[] = [];
  category = '';

home(){
   this.route.navigate(["/home"]);
 }

 async loadProducts(){
  const load = await this.loader.create({
    message: 'Veuillez patienter...',
  });

  await load.present();

  this.routeParam.queryParams.subscribe((params) => {
    console.log(params);
    this.category = params['category'];
  });
  await this.data
    .getMydiscountDataBy('/productBy/' + this.category)
    .then(async (data) => {
      
      this.products = data.products;
     // console.log(data.products[0])
    await  load.dismiss()
    })
    .catch(async ()=>{
      await  load.dismiss()
    });
 }

  async ngOnInit() {
 await this.loadProducts()
  }
}
