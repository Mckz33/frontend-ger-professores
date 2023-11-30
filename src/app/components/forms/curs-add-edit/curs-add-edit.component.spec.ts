import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursAddEditComponent } from './curs-add-edit.component';

describe('CursAddEditComponent', () => {
  let component: CursAddEditComponent;
  let fixture: ComponentFixture<CursAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CursAddEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CursAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
