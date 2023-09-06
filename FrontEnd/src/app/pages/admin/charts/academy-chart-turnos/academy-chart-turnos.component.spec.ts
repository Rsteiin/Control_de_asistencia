import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyChartTurnosComponent } from './academy-chart-turnos.component';

describe('AcademyChartTurnosComponent', () => {
  let component: AcademyChartTurnosComponent;
  let fixture: ComponentFixture<AcademyChartTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademyChartTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyChartTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
