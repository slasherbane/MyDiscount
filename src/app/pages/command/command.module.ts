import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommandPageRoutingModule } from './command-routing.module';

import { CommandPage } from './command.page';
import { MenuModule } from 'src/app/modules/menu/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommandPageRoutingModule,MenuModule
  ],
  declarations: [CommandPage]
})
export class CommandPageModule {}
