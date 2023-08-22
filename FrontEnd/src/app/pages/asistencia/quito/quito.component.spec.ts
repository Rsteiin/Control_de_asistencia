import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitoComponent } from './quito.component';

describe('QuitoComponent', () => {
  let component: QuitoComponent;
  let fixture: ComponentFixture<QuitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuitoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
