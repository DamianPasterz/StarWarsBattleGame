import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';

import { BattleStatsChartComponent } from '@shared/components/battle-stats-chart/battle-stats-chart.component';
import { BattleStatsComponent } from './battle-stats/battle-stats.component';

const routes: Routes = [
  {
    path: '',
    component: BattleStatsComponent,
  },
];

@NgModule({
  declarations: [BattleStatsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), BattleStatsChartComponent, MatTabsModule],
})
export class StatisticsModule {}
