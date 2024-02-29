import { Actions, ofType } from '@ngrx/effects';
import { ActionCreator } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Observable, map, take } from 'rxjs';

export const checkActionSuccess = (
  actions$: Actions,
  success: ActionCreator<string, (params: any) => TypedAction<string>>,
  failure: ActionCreator<string, (params: any) => TypedAction<string>>
): Observable<boolean> => {
  return actions$.pipe(
    ofType(success, failure),
    take(1),
    map((action) => {
      return action.type === success.type;
    })
  );
};
