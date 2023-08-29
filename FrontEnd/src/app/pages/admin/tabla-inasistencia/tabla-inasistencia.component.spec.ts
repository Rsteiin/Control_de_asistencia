import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaInasistenciaComponent } from './tabla-inasistencia.component';

describe('TablaInasistenciaComponent', () => {
  let component: TablaInasistenciaComponent;
  let fixture: ComponentFixture<TablaInasistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaInasistenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaInasistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
