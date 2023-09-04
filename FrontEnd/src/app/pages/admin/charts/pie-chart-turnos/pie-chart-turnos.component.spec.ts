import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartTurnosComponent } from './pie-chart-turnos.component';

describe('PieChartTurnosComponent', () => {
  let component: PieChartTurnosComponent;
  let fixture: ComponentFixture<PieChartTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieChartTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
