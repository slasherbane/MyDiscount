import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Command } from '../../interfaces/Command';

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
    console.log('destroying comandr');
    this.commands = [];
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
    this.commands = [];
    await this.data

      .getMydiscountDataBy('/command/user')
      .then(async (data) => {
        this.commands = data.commands;
        await load.dismiss();
      })
      .catch(async (err) => {
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
