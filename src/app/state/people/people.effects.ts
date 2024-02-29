import { Injectable } from '@angular/core';
import { HttpService } from '@core/http/http.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '@state/people/people.actions';
import { extractNumberFromUrl } from '@state/utils/extractNumberFromUrl';
import { processMass } from '@state/utils/massChecker';
import { catchError, concatMap, forkJoin, map, of, switchMap } from 'rxjs';

@Injectable()
export class PeopleEffects {
  constructor(
    private actions$: Actions,
    private httpService: HttpService
  ) {}

  getPeopleAndProperties$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.getListOfPeople.request),
      concatMap(() =>
        this.httpService.getPeopleResource().pipe(
          switchMap(({ results }) => {
            const allPeople = results.map((people) =>
              this.httpService.getPeopleByID(people.uid).pipe(
                map(({ result }) => ({
                  name: result.properties.name,
                  id: people.uid,
                  mass: processMass(result.properties.mass),
                  homeworld: extractNumberFromUrl(result.properties.homeworld),
                })),
                catchError((error) => {
                  console.error('Error fetching people properties:', error);
                  return of(null);
                })
              )
            );

            return forkJoin(allPeople).pipe(
              map((properties) => actions.getSinglePeoplePropertis.success({ people: properties })),
              catchError((error) => of(actions.getSinglePeoplePropertis.failure({ error })))
            );
          }),
          catchError((error) => of(actions.getListOfPeople.failure({ error })))
        )
      )
    );
  });
}
