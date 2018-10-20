import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionScreenComponent } from './question-screen.component';

describe('QuestionScreenComponent', () => {
  let component: QuestionScreenComponent;
  let fixture: ComponentFixture<QuestionScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
