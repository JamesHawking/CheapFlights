import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { AirportsService } from '../providers/airports.service';
import { CheapflightsService } from '../providers/cheapflights.service';

import { DatePickerComponent } from '../date-picker/date-picker.component';

import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-airport-selector',
  templateUrl: './airport-selector.component.html',
  styleUrls: ['./airport-selector.component.css'],
  animations: [
  trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(-100%)'}),
      animate(500)
    ]),
    transition('* => void', [
      animate(500, style({transform: 'translateX(100%)'}))
    ])
  ])
]
})
export class AirportSelectorComponent implements OnInit {
  constructor(private airportsService: AirportsService, private cheapflightsService: CheapflightsService) { }

  @Output() parentList: EventEmitter<any> = new EventEmitter();

  model = {};
  errorMessage: string;
  airportsList: any[];
  flightList: any;
  countryNames: any;
  origin: any;
  destination: any;
  cityList: any[];
  submitted = false;
  cheapFlights: Observable<Array<any>>;
  travelForm: FormGroup;
  public events: any[] = [];

  searchForOrigin = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.cityList.filter(v => new RegExp(term, 'gi').test(v)).slice(0, 10));

  searchForDestination = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.cityList.filter(v => new RegExp(term, 'gi').test(v)).slice(0, 10));


  getAirportsList() {
    this.airportsService.getAirports()
      .subscribe(
      airports => this.airportsList = airports,
      error => this.errorMessage = <any>error, 
      () => this.cityList = this.airportsList.map(airport => airport.city));
  }

  searchCheapFlights(originCode, destinationCode, departureDate, returnDate) {
    // let formData = this.travelForm.value;
    this.cheapflightsService.getFlights(originCode, destinationCode, departureDate, returnDate)
      .subscribe(
      flights => this.cheapFlights = flights,
      error => this.errorMessage = <any>error,
      () => console.log(this.cheapFlights));
      //this.parentList.emit(this.cheapFlights));
  }


  onSubmit({ value, valid }: { value: any, valid: boolean }) { 
    this.submitted = true; 
    let originCode = this.airportsList.filter(airport => {
      return airport.city === value.origin;
    }).map(airport => airport.iataCode);

    let destinationCode = this.airportsList.filter(airport => {
      return airport.city === value.destination;
    }).map(airport => airport.iataCode);

     let departureDate = Object.keys(value.departureDate).
     map(key => `${value.departureDate[key]}`).reduce((acc, value) => `${acc}-${value}`);

    let returnDate = Object.keys(value.returnDate).
     map(key => `${value.returnDate[key]}`).reduce((acc, value) => `${acc}-${value}`);

    //console.log(departureDate, returnDate);
    //console.log(this.airportsList);
    //console.log(value);
    this.searchCheapFlights(originCode, destinationCode, departureDate, returnDate);
  }

  onMouseOver(e) {
   // e.target.classList;
  }

  ngOnInit() {
    this.getAirportsList();
    
  }

}
