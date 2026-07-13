import { TestBed } from '@angular/core/testing';

import { Roster } from './roster';

describe('Roster', () => {
  let service: Roster;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Roster);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
