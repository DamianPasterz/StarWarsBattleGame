import { animate, state, style, transition, trigger } from '@angular/animations';

export const textAnimation = trigger('textAnimation', [
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
      color: '#171212',
      top: '-6000px',
      transform: 'rotateX(25deg) translateZ(-2500px)',
    })
  ),
  transition('start => end', [animate('30s')], {}),
]);
