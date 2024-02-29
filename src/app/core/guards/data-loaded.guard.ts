import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StarshipDataGuardService } from '@core/guards/starship-data.guard';

import { PeopleDataGuardService } from '@core/guards/people-data.guard';

@Injectable({
  providedIn: 'root',
})
export class DataLoadedGuard {
  constructor(
    private starshipGuard: StarshipDataGuardService,
    private peopleGuard: PeopleDataGuardService,
    private router: Router
  ) {}

  canActivate: CanActivateFn = (route, state) => {
    const battleType = route.queryParams['battle'];

    if (battleType === 'starship') {
      return this.starshipGuard.canActivate(route, state);
    } else if (battleType === 'people') {
      return this.peopleGuard.canActivate(route, state);
    }
    return this.router.createUrlTree(['/']);
  };
}
