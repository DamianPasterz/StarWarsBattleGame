import { Injectable } from '@angular/core';
import { HttpService } from '@core/http/http.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '@state/starships/starships.actions';
import { processMass } from '@state/utils/massChecker';
import { catchError, concatMap, forkJoin, map, of, switchMap } from 'rxjs';

@Injectable()
export class StarshipsEffects {
  constructor(
    private actions$: Actions,
    private httpService: HttpService
  ) {}

  // getStarShipsAndProperties$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(actions.getListOfstarships.request),
  //     switchMap(() =>
  //       this.httpService.getStarShipsResource().pipe(
  //         switchMap((listOfStarship) =>
  //           from(listOfStarship.results).pipe(
  //             mergeMap((starShip) =>
  //               this.httpService.getStarshipByID(starShip.uid).pipe(
  //                 map(({ result }) =>
  //                   actions.getSingleStarshipsPropertis.success({
  //                     starship: result.properties,
  //                   })
  //                 ),
  //                 catchError((error) => of(actions.getSingleStarshipsPropertis.failure({ error })))
  //               )
  //             )
  //           )
  //         ),
  //         catchError((error) => of(actions.getListOfstarships.failure({ error })))
  //       )
  //     )
  //   );
  // });

  // Pobieranie listy statków kosmicznych

  // getStarshipsAndProperties$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(actions.getListOfstarships.request),
  //     switchMap(() =>
  //       this.httpService.getStarShipsResource().pipe(
  //         switchMap(({ results }) =>
  //           from(results).pipe(
  //             mergeMap((starship) =>
  //               this.httpService.getStarshipByID(starship.uid).pipe(
  //                 map(({ result }) =>
  //                   actions.getSingleStarshipsPropertis.success({ starship: result.properties })
  //                 ),
  //                 catchError((error) => of(actions.getSingleStarshipsPropertis.failure({ error })))
  //               )
  //             )
  //           )
  //         ),
  //         catchError((error) => of(actions.getListOfstarships.failure({ error })))
  //       )
  //     )
  //   );
  // });

  getStarshipsAndProperties$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.getListOfstarships.request),
      switchMap(() =>
        this.httpService.getStarShipsResource().pipe(
          concatMap(({ results }) => {
            const allStarships = results.map((starship, index) =>
              this.httpService.getStarshipByID(starship.uid).pipe(
                map(({ result }) => ({
                  id: starship.uid,
                  name: result.properties.name,
                  crew: processMass(result.properties.crew),
                  manufacturer: result.properties.manufacturer,
                })),
                catchError((error) => {
                  console.error('Error fetching starship properties:', error);
                  return of(null);
                })
              )
            );

            return forkJoin(allStarships).pipe(
              map((properties) => actions.getSingleStarshipsPropertis.success({ starship: properties })),
              catchError((error) => of(actions.getSingleStarshipsPropertis.failure({ error })))
            );
          }),
          catchError((error) => of(actions.getListOfstarships.failure({ error })))
        )
      )
    );
  });
}
