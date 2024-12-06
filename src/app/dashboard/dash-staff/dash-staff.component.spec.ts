import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashStaffComponent } from './dash-staff.component';

describe('DashStaffComponent', () => {
  let component: DashStaffComponent;
  let fixture: ComponentFixture<DashStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
