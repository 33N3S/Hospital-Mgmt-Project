import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashLandingComponent } from './dash-landing.component';

describe('DashLandingComponent', () => {
  let component: DashLandingComponent;
  let fixture: ComponentFixture<DashLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashLandingComponent]
    });
    fixture = TestBed.createComponent(DashLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
