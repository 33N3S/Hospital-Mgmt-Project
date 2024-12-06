import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashLoginComponent } from './dash-login.component';

describe('DashLoginComponent', () => {
  let component: DashLoginComponent;
  let fixture: ComponentFixture<DashLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashLoginComponent]
    });
    fixture = TestBed.createComponent(DashLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
