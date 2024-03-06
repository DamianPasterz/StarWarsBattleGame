import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleStatsChartComponent } from './battle-stats-chart.component';

describe('BattleStatsChartComponent', () => {
  let component: BattleStatsChartComponent;
  let fixture: ComponentFixture<BattleStatsChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BattleStatsChartComponent]
    });
    fixture = TestBed.createComponent(BattleStatsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
