import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilPage } from './profil.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilPage
  },
  {
    path: 'personal',
    loadChildren: () => import('./personal/personal.module').then( m => m.PersonalPageModule)
  },
  {
    path: 'commands',
    loadChildren: () => import('./commands/commands.module').then( m => m.CommandsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilPageRoutingModule {}
