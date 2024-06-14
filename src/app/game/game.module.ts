import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { DataLoadedGuard } from '@core/guards/data-loaded.guard';
import { StarshipDataGuardService } from '@core/guards/starship-data.guard';
import { BattleStatsChartComponent } from '@shared/components/battle-stats-chart/battle-stats-chart.component';
import { MyToolbarComponent } from '../my-toolbar/my-toolbar.component';
import { BattleModeSelectionComponent } from './battle-mode-selection/battle-mode-selection.component';
import { BattleTypeCardComponent } from './battle-mode-selection/battle-type-card/battle-type-card.component';
import { BattleOpponentsCardComponent } from './battle/battle-opponents-card/battle-opponents-card.component';
import { BattleComponent } from './battle/battle.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  {
    path: '',
    component: GameComponent,
    children: [
      {
        path: 'selectMode',
        component: BattleModeSelectionComponent,
      },
      {
        path: 'battle',
        component: BattleComponent,
        canActivate: [DataLoadedGuard],
      },
      {
        path: 'statistics',
        loadChildren: () => import('../statistics/statistics.module').then((mod) => mod.StatisticsModule),
      },
    ],
  },
];

@NgModule({
  declarations: [
    GameComponent,
    BattleComponent,
    MyToolbarComponent,
    BattleModeSelectionComponent,
    BattleTypeCardComponent,
    BattleOpponentsCardComponent,
  ],
  providers: [DataLoadedGuard, StarshipDataGuardService],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    MatToolbarModule,
    BattleStatsChartComponent,
    MatCardModule,
  ],
})
export class GameModule {}
