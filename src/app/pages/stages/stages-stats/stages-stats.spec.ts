import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagesStats } from './stages-stats';

describe('StagesStats', () => {
  let component: StagesStats;
  let fixture: ComponentFixture<StagesStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StagesStats],
    }).compileComponents();

    fixture = TestBed.createComponent(StagesStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
