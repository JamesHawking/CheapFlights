import { TestBed, inject } from '@angular/core/testing';

import { AirportsService } from './airports.service';

describe('AirportsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AirportsService]
    });
  });

  it('should ...', inject([AirportsService], (service: AirportsService) => {
    expect(service).toBeTruthy();
  }));
});
