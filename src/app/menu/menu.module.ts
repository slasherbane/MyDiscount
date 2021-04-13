import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
      path: 'first', 
      loadChildren: './first/first.module#FirstPageModule'
    },
    {
      path: 'second', 
      loadChildren: '../second/second.module#SecondPageModule'
    }
    ]

  },
  {
    path: '',
    redirectTo: '/menu/first'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
