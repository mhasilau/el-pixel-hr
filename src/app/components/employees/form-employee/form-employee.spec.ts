import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEmployee } from './form-employee';

describe('FormEmployee', () => {
  let component: FormEmployee;
  let fixture: ComponentFixture<FormEmployee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEmployee],
    }).compileComponents();

    fixture = TestBed.createComponent(FormEmployee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
