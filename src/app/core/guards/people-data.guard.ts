import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { checkActionSuccess } from '@shared/utils/check-action-success';
import { AppState } from '@state/index';
import { PeopleFacade, getSinglePeopleProperties } from '@state/people';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PeopleDataGuardService {
  constructor(
    private peopleFacade: PeopleFacade,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  canActivate: CanActivateFn = (): Observable<boolean> => {
    return this.store
      .select((state) => state.people.people.length > 0)
      .pipe(
        switchMap((peopleLoaded) => {
          if (peopleLoaded) {
            return of(true);
          } else {
            this.peopleFacade.getPeople();

            return checkActionSuccess(
              this.actions$,
              getSinglePeopleProperties.success,
              getSinglePeopleProperties.failure
            );
          }
        })
      );
  };
}
