import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashRoomsComponent } from './dash-rooms.component';

describe('DashRoomsComponent', () => {
  let component: DashRoomsComponent;
  let fixture: ComponentFixture<DashRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashRoomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
