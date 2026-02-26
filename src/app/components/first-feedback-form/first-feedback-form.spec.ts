import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstFeedbackForm } from './first-feedback-form';

describe('FirstFeedbackForm', () => {
  let component: FirstFeedbackForm;
  let fixture: ComponentFixture<FirstFeedbackForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstFeedbackForm],
    }).compileComponents();

    fixture = TestBed.createComponent(FirstFeedbackForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
