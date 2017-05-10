import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { AirportsService } from '../providers/airports.service';
import { CheapflightsService } from '../providers/cheapflights.service';

import { DatePickerComponent } from '../date-picker/date-picker.component';

import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';

@Component({
  selector: 'app-airport-selector',
  templateUrl: './airport-selector.component.html',
  styleUrls: ['./airport-selector.component.css']
})
export class AirportSelectorComponent implements OnInit {
  constructor(private airportsService: AirportsService, private cheapflightsService: CheapflightsService) { }

  model = {};
  errorMessage: string;
  airportsList: any[];
  flightList: any;
  countryNames: any;
  origin: any;
  destination: any;
  cityList: any[];
  submitted = false;
  travelForm: FormGroup;
  public events: any[] = [];

  searchForOrigin = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.airportsList.map(airport => airport.city));

  searchForDestination = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.airportsList.map(airport => airport.city));


  getAirportsList() {
    this.airportsService.getAirports()
      .subscribe(
      airports => this.airportsList = airports,
      error => this.errorMessage = <any>error);
  }

  searchCheapFlights(originCode, destinationCode, departureDate, returnDate) {
    // let formData = this.travelForm.value;
    this.cheapflightsService.getFlights(originCode, destinationCode, departureDate, returnDate)
      .subscribe(
      flights => this.flightList = flights,
      error => this.errorMessage = <any>error);
  }


  onSubmit({ value, valid }: { value: any, valid: boolean }) { 
    this.submitted = true; 
    let originCode = this.airportsList.filter(airport => {
      return airport.city === value.origin;
    }).map(airport => airport.iataCode);

    let destinationCode = this.airportsList.filter(airport => {
      return airport.city === value.destination;
    }).map(airport => airport.iataCode);
    //'${value.departureDate[key]}-${value.departureDate[key]]-${value.departureDate[key]}'
     let departureDate = Object.keys(value.departureDate).
     map(key => `${value.departureDate[key]}`).reduce((acc, value) => `${acc}-${value}`);

    let returnDate = Object.keys(value.returnDate).
     map(key => `${value.returnDate[key]}`).reduce((acc, value) => `${acc}-${value}`);

    //console.log(departureDate, returnDate);
    //console.log(this.airportsList);
    //console.log(value);
    this.searchCheapFlights(originCode, destinationCode, departureDate, returnDate);
  }

  ngOnInit() {
    this.getAirportsList();
  }

}
