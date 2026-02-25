/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternsListComponent } from './interns-list.component';

describe('InternsListComponent', () => {
  let component: InternsListComponent;
  let fixture: ComponentFixture<InternsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InternsListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
