/* tslint:disable:no-unused-variable */
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';

import { HttpModule } from '@angular/http';
import { AppComponent }   from './app.component';

import { MainLayout } from './layouts/index';
import { ShapesModule } from './components/shapes/index';



@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    routing,
    ShapesModule,
  ],
  declarations: [
    AppComponent,
    MainLayout,
  ],
  providers: [
    HttpModule,
    appRoutingProviders,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
