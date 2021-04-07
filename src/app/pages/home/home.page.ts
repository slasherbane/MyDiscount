import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Article } from 'src/app/interfaces/article';
import { DataService } from '../../services/data.service';
import { ToastGeneratorService } from '../../services/toast-generator.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private data: DataService,
    private loader: LoadingController,
    private route: Router,
    private toast: ToastController
  ) {}



  products = [];
  categories = [];
  async ngOnInit() {
    const load = await this.loader.create({
      message: 'Please wait...',
    });
    await load.present();
    // this.articles = await this.data.requestByUrlTrashTalk(this.data.urls[0]);
    await this.data
      .getMydiscountDataBy('/categories')
      .then(async (data: any) => {
        this.categories = data.categories;
        await load.dismiss();
      })
      .catch(async (err) => {
        await load.dismiss();
        ToastGeneratorService.generate(
          'Une erreur est survenue: ' + err.status,
          4000,
          'top',
          ''
        );
        return;
      });
    await this.data
      .getMydiscountDataBy('/productBy/promo')
      .then(async (data: any) => {
        this.products = data.products;
        await load.dismiss();
      })
      .catch(async (err) => {
        await load.dismiss();
        ToastGeneratorService.generate(
          'Une erreur est survenue: ' + err.status,
          4000,
          'top',
          ''
        );
        return;
      });
  }

  // voir comment crée des directive
  randomPicture() {}
}
