import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { checkActionSuccess } from '@shared/utils/check-action-success';
import { AppState } from '@state/index';
import { StarshipsFacade, getSingleStarshipsPropertis } from '@state/starships';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
    return this.store.pipe(
      select((state) => state.starships.starships.length > 0),
      switchMap((starshipsLoaded) => {
        if (starshipsLoaded) {
          return of(true);
        } else {
          this.starshipFacade.getStarships();
          return checkActionSuccess(
            this.actions$,
            getSingleStarshipsPropertis.success,
            getSingleStarshipsPropertis.failure
          );
        }
      })
    );
  };
}
