import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentsPage } from './add-comments.page';

describe('AddCommentsPage', () => {
  let component: AddCommentsPage;
  let fixture: ComponentFixture<AddCommentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCommentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
