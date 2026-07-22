import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterStats } from './roster-stats';

describe('RosterStats', () => {
  let component: RosterStats;
  let fixture: ComponentFixture<RosterStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RosterStats],
    }).compileComponents();

    fixture = TestBed.createComponent(RosterStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
