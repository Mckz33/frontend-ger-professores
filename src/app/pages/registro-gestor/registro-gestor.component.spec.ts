import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroGestorComponent } from './registro-gestor.component';

describe('RegistroGestorComponent', () => {
  let component: RegistroGestorComponent;
  let fixture: ComponentFixture<RegistroGestorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroGestorComponent]
    });
    fixture = TestBed.createComponent(RegistroGestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
