import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AirportSelectorComponent } from './airport-selector/airport-selector.component';

import { AirportsService } from './providers/airports.service';
import { CheapflightsService } from './providers/cheapflights.service';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { FlightListComponent } from './flight-list/flight-list.component'

@NgModule({
  declarations: [
    AppComponent,
    AirportSelectorComponent,
    DatePickerComponent,
    FlightListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [AirportsService, CheapflightsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
