import { AnimationEvent, animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { GlobalsFacade } from '@state/globals';

@Component({
  selector: 'app-start-board',
  templateUrl: './start-board.component.html',
  styleUrls: ['./start-board.component.scss'],
  animations: [
    trigger('textAnimation', [
      state(
        'start',
        style({
          color: '#feda4a',
          top: '0',
          transform: 'rotateX(20deg) translateZ(0)',
        })
      ),
      state(
        'end',
        style({
          color: '#000',
          top: '-6000px',
          transform: 'rotateX(25deg) translateZ(-2500px)',
        })
      ),
      transition('start => end', [animate('2s')], {}),
    ]),
  ],
})
export class StartBoardComponent {
  public textAnimationState: string;
  public showButton = false;
  public loading$ = this.globalsFacade.loading$;

  constructor(private globalsFacade: GlobalsFacade) {
    this.textAnimationState = 'start';
  }

  animationDone(event: AnimationEvent): void {
    this.textAnimationState = 'end';

    if (event.fromState === 'start') {
      this.showButton = true;
    }
  }
}
