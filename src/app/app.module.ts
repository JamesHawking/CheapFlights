import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AirportSelectorComponent } from './airport-selector/airport-selector.component';

import { AirportsService } from './providers/airports.service';
import { DatePickerComponent } from './date-picker/date-picker.component'

@NgModule({
  declarations: [
    AppComponent,
    AirportSelectorComponent,
    DatePickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [AirportsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
