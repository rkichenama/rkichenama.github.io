import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShapesModule } from './shapes/shapes.module';

import {
  HexTableComponent
} from './index';


@NgModule({
  declarations: [
    HexTableComponent
  ],
  exports: [
    HexTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ShapesModule,
  ],
  providers: [],
})
export class ComponentsModule { }
