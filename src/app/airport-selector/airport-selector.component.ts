import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { AirportsService } from '../providers/airports.service';

import { DatePickerComponent } from '../date-picker/date-picker.component';

import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';

@Component({
  selector: 'app-airport-selector',
  templateUrl: './airport-selector.component.html',
  styleUrls: ['./airport-selector.component.css']
})
export class AirportSelectorComponent implements OnInit {
  constructor(private airportsService: AirportsService) { }

  errorMessage: string;
  airportsList: any[];
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

  searchCheapFlights(event) {
    let formData = this.travelForm.value;
  }


  onSubmit({ value, valid }: { value: any, valid: boolean }) { 
    this.submitted = true; 
    console.log(value)
  }

  ngOnInit() {
    this.getAirportsList();
  }

}
