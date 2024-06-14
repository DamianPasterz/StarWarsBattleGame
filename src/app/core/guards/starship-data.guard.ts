import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { checkActionSuccess } from '@shared/utils/check-action-success';
import { AppState } from '@state/index';
import { StarshipsFacade, getSingleStarshipsProperties } from '@state/starships';

@Injectable({
  providedIn: 'root',
})
export class StarshipDataGuardService {
  constructor(
    private starshipFacade: StarshipsFacade,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  canActivate: CanActivateFn = (): Observable<boolean> => {
    return this.store
      .select((state) => state.starships.starships.length > 0)
      .pipe(
        switchMap((starshipsLoaded) => {
          if (starshipsLoaded) {
            return of(true);
          } else {
            this.starshipFacade.getStarships();
            return checkActionSuccess(
              this.actions$,
              getSingleStarshipsProperties.success,
              getSingleStarshipsProperties.failure
            );
          }
        })
      );
  };
}
