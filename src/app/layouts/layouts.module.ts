/* tslint:disable:no-unused-variable */
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../components/components.module';
import { ShapesModule } from '../components/shapes/shapes.module';

import { MainLayout } from './main.layout';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    ShapesModule,
  ],
  declarations: [
    MainLayout
  ],
  exports: [
    MainLayout
  ],
})
export class LayoutsModule { }
