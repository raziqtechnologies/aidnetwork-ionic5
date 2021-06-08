import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCasePage } from './add-case.page';

describe('AddCasePage', () => {
  let component: AddCasePage;
  let fixture: ComponentFixture<AddCasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCasePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
