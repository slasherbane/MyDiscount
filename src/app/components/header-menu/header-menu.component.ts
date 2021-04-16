import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Command } from '../../interfaces/Command';
import { LocalDataService } from '../../services/local-data.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {

  constructor(private route:Router,private local:LocalDataService) { }

  ngOnInit() {}

  command(){
    this.route.navigate(["/command"])
  }

  profil(){
    this.route.navigate(["/profil"])
  }

  cart(){
    this.route.navigate(["/cart"])
  }


  async disconnect() {
    await  this.local.disconnect();
   }

}
