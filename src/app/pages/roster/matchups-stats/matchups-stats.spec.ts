import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchupsStats } from './matchups-stats';

describe('MatchupsStats', () => {
  let component: MatchupsStats;
  let fixture: ComponentFixture<MatchupsStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchupsStats],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchupsStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
