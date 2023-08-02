/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DteService } from './dte.service';

describe('Service: Dte', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DteService]
    });
  });

  it('should ...', inject([DteService], (service: DteService) => {
    expect(service).toBeTruthy();
  }));
});
