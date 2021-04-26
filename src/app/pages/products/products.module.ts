import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';
import { ProductPage } from './product/product.page';

import { HeaderMenuComponent } from 'src/app/components/header-menu/header-menu.component';
import { MenuModule } from 'src/app/modules/menu/menu.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule,MenuModule
    
  ],
  declarations: [ProductsPage]
})
export class ProductsPageModule {}
