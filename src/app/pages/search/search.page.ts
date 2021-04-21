import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss',"../home/home.page.scss"],
})
export class SearchPage implements OnInit {
  constructor(private data: DataService, private loader: LoadingController) {}

  products = [];
  search = '';
  noResult = true;

  ngOnInit() {}

  async doSearch() {
    const load = await this.loader.create({
      message: 'Veuillez patienter...',
    });

    await load.present();
    this.data
      .getMydiscountDataBy('/product/' + this.search + '?mode=literal')
      .then(async (data) => {
        this.products = data.products;
        console.log(this.products)
        this.noResult =false;
       await load.dismiss();
      })
      .catch(async (err) => {
        this.noResult =true;
       await load.dismiss();
      });
  }
}
