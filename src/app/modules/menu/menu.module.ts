import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { HeaderMenuComponent } from 'src/app/components/header-menu/header-menu.component';
import { AppBrandComponent } from 'src/app/components/app-brand/app-brand.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AppBrandComponent,MenuComponent,HeaderMenuComponent],
  exports:[AppBrandComponent,MenuComponent,HeaderMenuComponent],
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class MenuModule { }
