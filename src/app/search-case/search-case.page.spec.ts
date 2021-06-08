import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCasePage } from './search-case.page';

describe('SearchCasePage', () => {
  let component: SearchCasePage;
  let fixture: ComponentFixture<SearchCasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCasePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
