import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartBoardComponent } from './start-board/start-board.component';

const routes: Routes = [
  {
    path: '',
    component: StartBoardComponent,
  },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then((mod) => mod.GameModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
