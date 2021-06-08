import { TestBed } from '@angular/core/testing';

import { AidareaService } from './aidarea.service';

describe('AidareaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AidareaService = TestBed.get(AidareaService);
    expect(service).toBeTruthy();
  });
});
