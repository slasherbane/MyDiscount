import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss', '../home/home.page.scss'],
})
export class SearchPage implements OnInit {
  constructor(private data: DataService, private loader: LoadingController) {}

  products = [];
  search = '';
  noResult = false;

  ngOnInit() {
    this.noResult = false;
  }

  async doSearch() {
    const load = await this.loader.create({
      message: 'Veuillez patienter...',
    });

    await load.present();
    this.data
      .getMydiscountDataBy('/product/' + this.search + '?mode=literal')
      .then(async (data) => {
        this.products = data.products;
        this.noResult = data.products.length < 1 ? true : false;

        await load.dismiss();
      })
      .catch(async (err) => {
        this.noResult = true;
        await load.dismiss();
      });
  }

  onSubmit() {
    this.doSearch();
  }

  store(event) {
    this.search = event.target.value;
  }
}
