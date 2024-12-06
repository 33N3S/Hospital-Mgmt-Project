import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashLoginAdminComponent } from './dash-login-admin.component';

describe('DashLoginAdminComponent', () => {
  let component: DashLoginAdminComponent;
  let fixture: ComponentFixture<DashLoginAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashLoginAdminComponent]
    });
    fixture = TestBed.createComponent(DashLoginAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
