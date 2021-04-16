import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { LocalDataService } from '../../services/local-data.service';
import { ToastGeneratorService } from '../../services/toast-generator.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(private menu: MenuController, private local: LocalDataService,private route:Router) {}

  ngOnInit() {
    this.menu.open("main-content")
  }
  toHome(){
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    //this.route.navigate(['/home'])
    this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.route.navigate(["/home"]);
  });
    
  }

  async closeMenu() {
     //await this.menu.close();
  }

  load(){
    console.log("dee")
  }



 async disconnect() {
   await  this.local.disconnect();
  }
}
