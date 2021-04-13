import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Command } from '../../interfaces/Command';

@Component({
  selector: 'app-command',
  templateUrl: './command.page.html',
  styleUrls: ['./command.page.scss'],
})
export class CommandPage implements OnInit {
  commands: Command[] = [];

  constructor(private data: DataService) {}

  async ngOnInit() {
    await this.data
      .getMydiscountDataBy('/command/user')
      .then((data) => {
        this.commands = data.commands;
      })
      .catch((err) => {});
  }

 toProduct(){
   // propriété ngFor qui redirige vers le produit détaillé quand on click dessus
 }
}
