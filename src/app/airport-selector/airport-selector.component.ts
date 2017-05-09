import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-airport-selector',
  templateUrl: './airport-selector.component.html',
  styleUrls: ['./airport-selector.component.css']
})
export class AirportSelectorComponent implements OnInit {
  data = {
    origin: null,
    destination: null
  }

  constructor() { }

  ngOnInit() {
  }

}
