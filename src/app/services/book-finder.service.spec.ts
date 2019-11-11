import { TestBed } from '@angular/core/testing';

import { BookFinderService } from './book-finder.service';

describe('BookFinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookFinderService = TestBed.get(BookFinderService);
    expect(service).toBeTruthy();
  });
});
