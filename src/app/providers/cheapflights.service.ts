import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class CheapflightsService {

  constructor(private http: Http) { }

  

  getFlights(originCode: any, destinationCode: any, departureDate: any, returnDate: string): Observable<any> {
    let searchURL = `https://murmuring-ocean-10826.herokuapp.com/en/api/2/flights/from/${originCode}/to/${destinationCode}/${departureDate}/${returnDate}/250/unique/?limit=15&offset-0`;

    return this.http.get(searchURL)
      .map(this.handleResponse)
      .catch(this.handleError);
  }

  private handleResponse(res: Response) {
    let body = res.json();
    
    // console.log(body.flights);
    // let airportsToReturn = [];
    // body.airports.map(airport => airportsToReturn.push({
    //   iataCode: airport.iataCode,
    //   country: airport.country.name,
    //   city: airport.name
    // }));

    return body.flights || {};
  }

  private handleError(error: Response | any) {
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
