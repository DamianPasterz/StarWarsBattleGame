import { Component } from '@angular/core';
import { GlobalsFacade } from '@state/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private globalsFacade: GlobalsFacade) {}
  public loading$ = this.globalsFacade.loading$;
}
