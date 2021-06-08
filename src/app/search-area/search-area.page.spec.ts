import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAreaPage } from './search-area.page';

describe('SearchAreaPage', () => {
  let component: SearchAreaPage;
  let fixture: ComponentFixture<SearchAreaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAreaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAreaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
