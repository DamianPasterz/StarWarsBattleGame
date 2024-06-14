import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '@state/globals/globals.actions';
import { of, switchMap } from 'rxjs';
import { actionsLoadingOn } from './globals.actions';

@Injectable()
export class GlobalsEffects {
  constructor(private actions$: Actions) {}

  public loadingOn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(...actionsLoadingOn),
      switchMap(() =>
        of(
          actions.showLoading({
            loading: true,
          })
        )
      )
    );
  });

  public loadingOf$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(...actions.actionsLoadingOff),
      switchMap(() => of(actions.showLoading({ loading: false })))
    );
  });
}
