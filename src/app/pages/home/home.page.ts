import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { RawCategory } from 'src/app/interfaces/Category';
import { RawProduct } from 'src/app/interfaces/Products';
import { LocalDataService } from 'src/app/services/local-data.service';
import { DataService } from '../../services/data.service';
import { ToastGeneratorService } from '../../services/toast-generator.service';
import { ErrorService } from '../../services/error.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  constructor(
    private data: DataService,
    private loader: LoadingController,
    private route: Router,
    private toast: ToastController,
    private local: LocalDataService,
    private menu: MenuController
  ) {}

  goProducts() {
    this.route.navigate(['/products']);
  }
  products: RawProduct[] = [];
  categories: RawCategory[] = [];

  private async renderError(err, redirect: boolean) {
   console.log(err)
    if (redirect && err.status === 401) {
      this.route.navigate(['/login']);
    }
  }

  async loadHome() {
    console.log('loading products...');
    const load = await this.loader.create({
      message: 'Please wait...',
    });
    await load.present();
    await this.data
      .getMydiscountDataBy('/categories')
      .then(async (data: any) => {
        this.categories = data.categories;
        await load.dismiss();
      })
      .catch(async (err) => {
        await load.dismiss();
        this.renderError(err, true);
        return;
      });

    await this.data
      .getMydiscountDataBy('/productBy/promo')
      .then(async (data: any) => {
        this.products = data.products;
        console.log(this.products);
        await load.dismiss();
      })
      .catch(async (err) => {
        await load.dismiss();
        this.renderError(err, true);
        return;
      });
  }

  async ngOnInit() {
    await this.loadHome();
  }

  ngOnDestroy() {
    console.log('destroy');
  }

  // voir comment crée des directive
  randomPicture() {}
}
