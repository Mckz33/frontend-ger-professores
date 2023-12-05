import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCoordenadorComponent } from './registro-coordenador.component';

describe('RegistroCoordenadorComponent', () => {
  let component: RegistroCoordenadorComponent;
  let fixture: ComponentFixture<RegistroCoordenadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroCoordenadorComponent]
    });
    fixture = TestBed.createComponent(RegistroCoordenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
