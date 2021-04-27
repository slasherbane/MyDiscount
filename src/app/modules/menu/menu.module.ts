import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderMenuComponent } from 'src/app/components/header-menu/header-menu.component';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HeaderMenuComponent],
  exports:[HeaderMenuComponent],
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class MenuModule { }
