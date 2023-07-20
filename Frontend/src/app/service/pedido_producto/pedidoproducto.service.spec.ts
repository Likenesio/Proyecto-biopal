/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PedidoproductoService } from './pedidoproducto.service';

describe('Service: Pedidoproducto', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PedidoproductoService]
    });
  });

  it('should ...', inject([PedidoproductoService], (service: PedidoproductoService) => {
    expect(service).toBeTruthy();
  }));
});
