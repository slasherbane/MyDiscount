import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MenuComponent } from '../../components/menu/menu.component';
import { AppBrandComponent } from 'src/app/components/app-brand/app-brand.component';
import { HeaderMenuComponent } from 'src/app/components/header-menu/header-menu.component';
import { MenuModule } from '../../modules/menu/menu.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,MenuModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
