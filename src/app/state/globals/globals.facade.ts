import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as selectors from '@state/globals/globals.selectors';
import { AppState } from '..';

@Injectable({
  providedIn: 'root',
})
export class GlobalsFacade {
  loading$ = this.store.select(selectors.selectLoading);
  constructor(private store: Store<AppState>) {}
}
