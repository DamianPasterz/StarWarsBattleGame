import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-battle-opponents-card',
  templateUrl: './battle-opponents-card.component.html',
  styleUrls: ['./battle-opponents-card.component.scss'],
  animations: [
    trigger('fadeIn', [transition(':enter', [style({ opacity: 0 }), animate('500ms', style({ opacity: 1 }))])]),
  ],
})
export class BattleOpponentsCardComponent {
  @Input() item: any;
  @Output() itemClicked = new EventEmitter<string>();

  selectRandomCharacterOrShip(name: string) {
    this.itemClicked.emit(name);
  }
}
