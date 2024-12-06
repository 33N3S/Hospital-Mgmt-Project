import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAboutComponent } from './dash-about.component';

describe('DashAboutComponent', () => {
  let component: DashAboutComponent;
  let fixture: ComponentFixture<DashAboutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashAboutComponent]
    });
    fixture = TestBed.createComponent(DashAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
