import { Component, OnInit } from '@angular/core';
import { LocalDataService } from '../../services/local-data.service';
import { ProductIndex } from '../../interfaces/Products';
import { Command, CommandEntry } from '../../interfaces/Command';
import { DataService } from 'src/app/services/data.service';
import { ToastGeneratorService } from '../../services/toast-generator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  constructor(
    private local: LocalDataService,
    private data: DataService,
    private route: Router
  ) {}

  products = [];

  async ngOnInit() {
    await this.populateCart();
  }

  async populateCart() {
    this.products = [];
    await this.local.getCart().then((data) => {
      data.forEach(async (p) => {
        await this.data
          .getMydiscountDataBy('/product/' + p.id + '?mode=numeral')
          .then((data) => {
            data.products[0]['quantity'] = p.quantity;
            console.log(data.products[0]);
            this.products.push(data.products[0]);
          })
          .catch((err) => {});
      });
      console.log(this.products);
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
  validate() {
    // tester cette fonction
    console.log('1');
    var commandEntries: CommandEntry[] = [];
    if (this.products.length < 1) {
      return;
    }
    console.log('2');
    this.products.forEach((p) => {
      commandEntries.push({ ref: p._id, quantity: p.quantity });
    });
    this.data.addCommand(commandEntries).then(async (res) => {
      console.log(res);
      this.clear();
      await ToastGeneratorService.generate(
        'Commande validé !',
        1500,
        'bottom',
        ''
      );
      await this.populateCart();
    });
  }

  async clear() {
    await this.local.clear();
  }
}
