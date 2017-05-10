import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AirportSelectorComponent } from '../airport-selector/airport-selector.component';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})

export class FlightListComponent implements AfterViewInit {

  @ViewChild(AirportSelectorComponent)
  private airportCmp: AirportSelectorComponent;

  flights: Observable<Array<any>>;
  list: any;
  
  

  ngAfterViewInit() {
    this.flights = this.airportCmp.cheapFlights;
  }

}
