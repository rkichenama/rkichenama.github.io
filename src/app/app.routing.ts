import { Routes, RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';

import { MainLayout } from './layouts/index';

const appRoutes: Routes = [
  {
    path: '',
    component: MainLayout,
  },
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
