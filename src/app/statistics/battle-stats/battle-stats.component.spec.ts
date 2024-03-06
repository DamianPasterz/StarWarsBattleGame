import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleStatsComponent } from './battle-stats.component';

describe('BattleStatsComponent', () => {
  let component: BattleStatsComponent;
  let fixture: ComponentFixture<BattleStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BattleStatsComponent]
    });
    fixture = TestBed.createComponent(BattleStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
