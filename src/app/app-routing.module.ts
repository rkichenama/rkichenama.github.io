import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayout } from './layouts/index';

const routes: Routes = [
  {
    path: '',
    component: MainLayout,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RichardKichenamaRoutingModule { }
