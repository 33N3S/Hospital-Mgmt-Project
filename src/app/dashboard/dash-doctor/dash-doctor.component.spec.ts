import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashDoctorComponent } from './dash-doctor.component';

describe('DashDoctorComponent', () => {
  let component: DashDoctorComponent;
  let fixture: ComponentFixture<DashDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashDoctorComponent]
    });
    fixture = TestBed.createComponent(DashDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
