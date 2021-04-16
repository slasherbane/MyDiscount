import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Command } from '../../interfaces/Command';

@Component({
  selector: 'app-command',
  templateUrl: './command.page.html',
  styleUrls: ['./command.page.scss'],
})
export class CommandPage implements OnInit {
  commands: Command[] = [];

  constructor(private data: DataService,private route:Router) {}

  async ngOnInit() {
    this. commands = [];
    await this.data
  
      .getMydiscountDataBy('/command/user')
      .then((data) => {
        this.commands = data.commands;
        console.log(this.commands);
      })
      .catch((err) => {console.log(err)});
  }

  home(){
    this.route.navigate(['/home']);
  }

 toProduct(){
   // propriété ngFor qui redirige vers le produit détaillé quand on click dessus
 }
}
