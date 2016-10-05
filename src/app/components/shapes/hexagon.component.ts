import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'hexagon',
  templateUrl: './hexagon.component.html',
  styleUrls: ['./hexagon.component.scss'],
  inputs: [ 'bgImage' ],
})
export class HexagonComponent implements OnInit {
  private _bgImage: string = '';
  @HostBinding('style.background-image')
    backgroundImage = 'url(http://placekitten.com/g/200/300)';

  constructor () { }

  ngOnInit () { }

  set bgImage (value: string) {
    this._bgImage = value;
    this.backgroundImage = `url(${this._bgImage})`;
  }

  get bgImage () { return this._bgImage; }
}
