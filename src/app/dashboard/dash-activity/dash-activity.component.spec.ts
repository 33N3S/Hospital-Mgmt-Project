import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashActivityComponent } from './dash-activity.component';

describe('DashActivityComponent', () => {
  let component: DashActivityComponent;
  let fixture: ComponentFixture<DashActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
