import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmCursoComponent } from './adm-curso.component';

describe('AdmCursoComponent', () => {
  let component: AdmCursoComponent;
  let fixture: ComponentFixture<AdmCursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmCursoComponent]
    });
    fixture = TestBed.createComponent(AdmCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
