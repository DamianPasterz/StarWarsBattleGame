import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-battle-type-card',
  templateUrl: './battle-type-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleTypeCardComponent {
  @Input() title: string;
  @Input() routerLink: string[];
  @Input() queryParams: any;
}
