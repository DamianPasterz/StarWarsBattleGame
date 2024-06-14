import { AnimationEvent } from '@angular/animations';
import { Component } from '@angular/core';
import { textAnimation } from '@shared/animations/text.animation';
import { GlobalsFacade } from '@state/globals';

@Component({
  selector: 'app-start-board',
  templateUrl: './start-board.component.html',
  styleUrls: ['./start-board.component.scss'],
  animations: [textAnimation],
})
export class StartBoardComponent {
  public textAnimationState: string;
  public showButton = false;
  public loading$ = this.globalsFacade.loading$;

  constructor(private globalsFacade: GlobalsFacade) {
    this.textAnimationState = 'start';
  }

  skipAnimation(): void {
    this.textAnimationState = 'start';
  }

  animationDone(event: AnimationEvent): void {
    this.textAnimationState = 'end';

    if (event.fromState === 'start') {
      this.showButton = true;
    }
  }
}
