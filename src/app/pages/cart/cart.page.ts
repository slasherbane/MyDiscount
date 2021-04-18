import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class CartPage implements OnInit,OnDestroy {
  constructor(
    private local: LocalDataService,
    private data: DataService,
    private route: Router,
    private loader:LoadingController
  ) {}
  @HostListener('unloaded')
  ngOnDestroy(): void {
    console.log("destroy profile");
  }

  products = [];

  async ngOnInit() {
    const load = await this.loader.create({
      message: 'Please wait...',
    });
    await load.present();
    await this.populateCart().then(async ()=>{
      await load.dismiss();
    }).catch(async (err)=>{ await load.dismiss();});
    
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
          .catch((err) => {return err});
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
      await load.dismiss()
    }).catch(async ()=>{await load.dismiss(); ToastGeneratorService.generate("Un erreur de communication est survenue",2500,"top","")});
  }

  home() {
    this.route.navigate(['/home']);
  }

  async clear() {
    await this.local.clear();
  }
}
