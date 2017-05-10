import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AirportsService {

  private airportsURL = 'https://murmuring-ocean-10826.herokuapp.com/en/api/2/forms/flight-booking-selector/';

  constructor(private http: Http) { }

  getAirports(): Observable<any> {
    return this.http.get(this.airportsURL)
                    .map(this.extractAirports)
                    .catch(this.handleError);
  }


  private extractAirports(res: Response) {
    let body = res.json();
    let airportsToReturn = [];
    body.airports.map(airport => airportsToReturn.push({
      iataCode: airport.iataCode,
      country: airport.country.name,
      city: airport.name
    }));

    return airportsToReturn || {};
  }

  private handleError (error: Response | any) {
    let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
