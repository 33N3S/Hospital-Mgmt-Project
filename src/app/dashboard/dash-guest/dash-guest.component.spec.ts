import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashGuestComponent } from './dash-guest.component';

describe('DashGuestComponent', () => {
  let component: DashGuestComponent;
  let fixture: ComponentFixture<DashGuestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashGuestComponent]
    });
    fixture = TestBed.createComponent(DashGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
