import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAidareaPage } from './add-aidarea.page';

describe('AddAidareaPage', () => {
  let component: AddAidareaPage;
  let fixture: ComponentFixture<AddAidareaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAidareaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAidareaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
