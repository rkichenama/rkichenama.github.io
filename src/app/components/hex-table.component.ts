import { Component, OnInit } from '@angular/core';
import { HexagonComponent } from '../components/shapes/index';

@Component({
  selector: 'hexagon-table',
  templateUrl: './hex-table.component.html',
  styleUrls: ['./hex-table.component.scss']
})
export class HexTableComponent implements OnInit {
  private url: string = 'http://placekitten.com/g/200/300';

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      let w: number = Math.floor(Math.random() * 600);
      this.url = `http://placekitten.com/g/${w}/${w}`
    }, 1000);
  }

}
