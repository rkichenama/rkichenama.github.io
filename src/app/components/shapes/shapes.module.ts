import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  HexagonComponent
} from './index';



@NgModule({
  declarations: [
    HexagonComponent
  ],
  exports: [
    HexagonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
})
export class ShapesModule { }
