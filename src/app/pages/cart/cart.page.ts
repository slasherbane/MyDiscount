import {
  AfterViewChecked,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { LocalDataService } from '../../services/local-data.service';
import { ProductIndex } from '../../interfaces/Products';
import { Command, CommandEntry } from '../../interfaces/Command';
import { DataService } from 'src/app/services/data.service';
import { ToastGeneratorService } from '../../services/toast-generator.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, OnDestroy, DoCheck {
  constructor(
    private local: LocalDataService,
    private data: DataService,
    private route: Router,
    private loader: LoadingController
  ) {}

  products = [];
  cart: ProductIndex[] = [];
  i = 0;

  equals = (a, b) =>
    a.length === b.length &&
    a.every((v, i) => JSON.stringify(v) === JSON.stringify(b[i]));

  async ngDoCheck(): Promise<void> {

  }

  @HostListener('unloaded')
  ngOnDestroy(): void {
    console.log('destroy cart');
  }

  async ngOnInit() {
    const load = await this.loader.create({
      message: 'Please wait...',
    });
    await load.present();
    await this.local
      .getCart()
      .then((data) => {
        this.cart = data;
      })
      .catch((err) => {
        this.cart = [];
      });
    await this.populateCart()
      .then(async () => {
        await load.dismiss();
      })
      .catch(async (err) => {
        await load.dismiss();
      });
  }

  doSum() {
    var total = 0;
    this.products.forEach((p) => {
      total += p.value * p.quantity;
    });
    return total;
  }

  async populateCart() {
    this.products = [];
    await this.local.getCart().then(async (data) => {
      data.forEach(async (p) => {
        await this.data
          .getMydiscountDataBy('/product/' + p.id + '?mode=numeral')
          .then(async (data) => {
            data.products[0]['quantity'] = p.quantity;
            console.log(data.products[0]);
            this.products.push(data.products[0]);
          })
          .catch((err) => {
            return err;
          });
      });
    });
  }

  async suppress(id) {
    await ToastGeneratorService.generate(
      'Votre produit a été retiré !',
      1000,
      'top',
      ''
    );
    await this.removeWithQuantity(id, -1).then(async () => {
      await this.populateCart();
    });
  }

  // une quantité négative retire directement le produit
  async removeWithQuantity(id, quantity) {
    await this.local.removeProductWithQuantity({ id: id, quantity: quantity });
  }

  // transform le contenu du panier en commande en cours
  async validate() {
    // tester cette fonction
    const load = await this.loader.create({
      message: 'Please wait...',
    });
    await load.present();
    var commandEntries: CommandEntry[] = [];
    if (this.products.length < 1) {
      return;
    }

    this.products.forEach((p) => {
      commandEntries.push({ ref: p._id, quantity: p.quantity });
    });
    this.data
      .addCommand(commandEntries)
      .then(async (res) => {
        console.log(res);
        this.clear();
        await ToastGeneratorService.generate(
          'Commande validé !',
          1500,
          'bottom',
          ''
        );
        await this.populateCart();
        await load.dismiss();
      })
      .catch(async () => {
        await load.dismiss();
        ToastGeneratorService.generate(
          'Un erreur de communication est survenue',
          2500,
          'top',
          ''
        );
      });
  }

  home() {
    this.route.navigate(['/home']);
  }

  async dumpCart() {
    const load = await this.loader.create({
      message: 'Please wait...',
    });
    await load.present();
    await this.local.clear();
    await this.populateCart();
    await load.dismiss();
  }

  async clear() {
    await this.local.clear();
  }
}
