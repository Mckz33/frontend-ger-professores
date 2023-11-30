import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmTrimestreComponent } from './adm-trimestre.component';

describe('AdmTrimestreComponent', () => {
  let component: AdmTrimestreComponent;
  let fixture: ComponentFixture<AdmTrimestreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmTrimestreComponent]
    });
    fixture = TestBed.createComponent(AdmTrimestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
