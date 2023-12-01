import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmDisciplinaComponent } from './adm-disciplina.component';

describe('AdmDisciplinaComponent', () => {
  let component: AdmDisciplinaComponent;
  let fixture: ComponentFixture<AdmDisciplinaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmDisciplinaComponent]
    });
    fixture = TestBed.createComponent(AdmDisciplinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
