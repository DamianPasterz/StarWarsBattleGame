import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [style({ opacity: 0 }), animate('1500ms', style({ opacity: 1 }))]),
]);
