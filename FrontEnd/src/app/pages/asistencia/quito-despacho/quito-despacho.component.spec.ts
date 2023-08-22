import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitoDespachoComponent } from './quito-despacho.component';

describe('QuitoDespachoComponent', () => {
  let component: QuitoDespachoComponent;
  let fixture: ComponentFixture<QuitoDespachoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuitoDespachoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuitoDespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
