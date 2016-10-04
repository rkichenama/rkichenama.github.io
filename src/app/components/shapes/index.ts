/* tslint:disable:no-unused-variable */
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HexagonComponent } from './hexagon.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [
    HexagonComponent
  ],
  exports: [
    HexagonComponent
  ],
})
export class ShapesModule { }
