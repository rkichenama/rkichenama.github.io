import { Component } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';

@Component({
  selector: 'ng-app',
  // templateUrl: './src/app/app.component.html',
  template: '<router-outlet></router-outlet>',
  // styleUrls: [ './src/app/app.component.scss' ]
})
export class AppComponent {}
