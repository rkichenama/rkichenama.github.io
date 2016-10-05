import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RichardKichenamaRoutingModule } from './app-routing.module';

import  { LayoutsModule } from './layouts/layouts.module';

import { AppComponent } from './app.component';
import { ShapesModule } from './components/shapes/shapes.module';
import { ComponentsModule } from './components/components.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LayoutsModule,
    ComponentsModule,
    ShapesModule,
    RichardKichenamaRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
