import { TestBed } from '@angular/core/testing';

import { TablaInasistenciaService } from './tabla-inasistencia.service';

describe('TablaInasistenciaService', () => {
  let service: TablaInasistenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablaInasistenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
