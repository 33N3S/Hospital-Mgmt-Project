import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RePatientComponent } from './re-patient.component';

describe('RePatientComponent', () => {
  let component: RePatientComponent;
  let fixture: ComponentFixture<RePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RePatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
