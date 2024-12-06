import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCertComponent } from './print-cert.component';

describe('PrintCertComponent', () => {
  let component: PrintCertComponent;
  let fixture: ComponentFixture<PrintCertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintCertComponent]
    });
    fixture = TestBed.createComponent(PrintCertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
