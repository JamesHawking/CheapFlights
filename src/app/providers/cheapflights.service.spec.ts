import { TestBed, inject } from '@angular/core/testing';

import { CheapflightsService } from './cheapflights.service';

describe('CheapflightsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheapflightsService]
    });
  });

  it('should ...', inject([CheapflightsService], (service: CheapflightsService) => {
    expect(service).toBeTruthy();
  }));
});
