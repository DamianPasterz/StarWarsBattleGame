import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { DataLoadedGuard } from '@core/guards/data-loaded.guard';
import { StarshipDataGuardService } from '@core/guards/starship-data.guard';
import { MyToolbarComponent } from '../my-toolbar/my-toolbar.component';
import { BattleModeSelectionComponent } from './battle-mode-selection/battle-mode-selection.component';
import { BattleComponent } from './battle/battle.component';
import { GameComponent } from './game/game.component';
import { BattleTypeCardComponent } from './battle-mode-selection/battle-type-card/battle-type-card.component';
import { BattleOpponentsCardComponent } from './battle/battle-opponents-card/battle-opponents-card.component';

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
    ],
  },
];

@NgModule({
  declarations: [GameComponent, BattleComponent, MyToolbarComponent, BattleModeSelectionComponent, BattleTypeCardComponent, BattleOpponentsCardComponent],
  providers: [DataLoadedGuard, StarshipDataGuardService],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
})
export class GameModule {}
