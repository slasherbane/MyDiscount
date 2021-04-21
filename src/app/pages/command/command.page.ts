import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Command } from '../../interfaces/Command';
import { ToastGeneratorService } from '../../services/toast-generator.service';

@Component({
  selector: 'app-command',
  templateUrl: './command.page.html',
  styleUrls: ['./command.page.scss'],
})
export class CommandPage implements OnInit, OnDestroy {
  commands: Command[] = [];

  constructor(
    private data: DataService,
    private route: Router,
    private loader: LoadingController
  ) {}
  @HostListener('unloaded')
  async ngOnDestroy(): Promise<void> {
    await this.populateCommands();
  }

  async ngOnInit() {
    await this.populateCommands();
  }

  async populateCommands() {
    const load = await this.loader.create({
      message: 'Please wait...',
    });
    await load.present();
    // this.commands = [];
    await this.data
      .getMydiscountDataBy('/command/user')
      .then(async (data) => {
        this.commands = data.commands;
        this.commands.forEach((c)=>{
          c["value"] = 0;
          c.products.forEach((p)=>{
            c["value"] += p.ref["value"] * p.quantity;
          })
        })
        await load.dismiss();
      })
      .catch(async (err) => {
        await ToastGeneratorService.error();
        await load.dismiss();
      });
  }

  async cancelCommand(id: string) {
    const load = await this.loader.create({
      message: 'Please wait...',
    });
    await load.present();
    await this.data
      .deleteCommand(id)
      .then(async (res) => {
        await ToastGeneratorService.generate(
          'Votre commande a été annulée !',
          2500,
          'top',
          ''
        );

        await this.populateCommands();
        await load.dismiss();
      })
      .catch(async (err) => {
        await ToastGeneratorService.generate(
          "L'opération n'a pas aboutie !",
          2500,
          'top',
          ''
        );

        await this.populateCommands();
        await load.dismiss();
      });
  }

  home() {
    this.route.navigate(['/home']);
  }

  toProduct() {
    // propriété ngFor qui redirige vers le produit détaillé quand on click dessus
  }
}
