import { Component, OnInit } from '@angular/core';
import { LocalDataService } from '../../services/local-data.service';
import { ProductIndex } from '../../interfaces/Products';
import { Command, CommandEntry } from '../../interfaces/Command';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  constructor(private local: LocalDataService, private data: DataService) {}

  products: ProductIndex[] = [];

  async ngOnInit() {
    this.products = await this.local.getCart();
  }

  // une quantité négative retire directement le produit
  async removeWithQuantity(id, quantity) {
    await this.local.removeProductWithQuantity({ id: id, quantity: quantity });
  }

  // transform le contenu du panier en commande en cours
  validate() {
    // tester cette fonction 
    var commandEntries: CommandEntry[] = [];
    this.products.forEach((p) => {
      commandEntries.push({ ref: p.id, quantity: p.quantity });
    });
    this.data
      .addCommand(commandEntries)
      .then((res) => {
        console.log(res);
        this.local.clear();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async clear() {
    await this.local.clear();
  }
}
