import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitoVideovigilanciaComponent } from './quito-videovigilancia.component';

describe('QuitoVideovigilanciaComponent', () => {
  let component: QuitoVideovigilanciaComponent;
  let fixture: ComponentFixture<QuitoVideovigilanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuitoVideovigilanciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuitoVideovigilanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
