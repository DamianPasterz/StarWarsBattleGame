import { Injectable } from '@angular/core';
import { HttpService } from '@core/http/http.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as actions from '@state/planets/planets.actions';
import { extractNumberFromUrl } from '@state/utils/extractNumberFromUrl';
import { processMass } from '@state/utils/massChecker';
import { catchError, concatMap, forkJoin, map, of, switchMap } from 'rxjs';
import { AppState } from '..';

@Injectable()
export class PlanetsEffects {
  constructor(
    private actions$: Actions,
    private httpService: HttpService,
    private store: Store<AppState>
  ) {}

  getPlanetsAndProperties$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.getListOfPlanets.request),
      concatMap(() =>
        this.httpService.getPlanetsResource().pipe(
          switchMap(({ results }) => {
            const allPlanets = results.map((planets) =>
              this.httpService.getPlanetByID(planets.uid).pipe(
                map(({ result }) => ({
                  name: result.properties.name,
                  id: planets.uid,
                  population: processMass(result.properties.population),
                  url: extractNumberFromUrl(result.properties.url),
                  residents: [],
                })),
                catchError((error) => {
                  console.error('Error fetching planets properties:', error);
                  return of(null);
                })
              )
            );

            return forkJoin(allPlanets).pipe(
              map((properties) => actions.getSinglePlanetPropertis.success({ planets: properties })),
              catchError((error) => of(actions.getSinglePlanetPropertis.failure({ error })))
            );
          }),
          catchError((error) => of(actions.getListOfPlanets.failure({ error })))
        )
      )
    );
  });

  updatePlanetsWithResidents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getSinglePlanetPropertis.success),
      switchMap(({ planets }) =>
        this.store.select('people').pipe(
          map((peopleState) => {
            const updatedPlanets = planets.map((planet) => {
              // Filtruj osoby, które mają homeworld równe id planety
              const residents = peopleState.people
                .filter((person) => person.homeworld === planet.id)
                .map((person) => ({
                  id: person.id,
                  name: person.name,
                }));

              return {
                ...planet,
                residents,
              };
            });

            return actions.updatePlanetsResidents({ planets: updatedPlanets });
          })
        )
      )
    )
  );
}
