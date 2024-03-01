import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PeopleDataGuardService } from '@core/guards/people-data.guard';
import { StarshipDataGuardService } from '@core/guards/starship-data.guard';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { DataLoadedGuard } from './data-loaded.guard';

describe('DataLoadedGuard', () => {
  let guard: DataLoadedGuard;
  let starshipGuardSpy: jasmine.SpyObj<StarshipDataGuardService>;
  let peopleGuardSpy: jasmine.SpyObj<PeopleDataGuardService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(() => {
    const starshipGuard = jasmine.createSpyObj('StarshipDataGuardService', ['canActivate']);
    const peopleGuard = jasmine.createSpyObj('PeopleDataGuardService', ['canActivate']);
    const router = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        DataLoadedGuard,
        { provide: StarshipDataGuardService, useValue: starshipGuard },
        { provide: PeopleDataGuardService, useValue: peopleGuard },
        { provide: Router, useValue: router },
      ],
    });

    guard = TestBed.inject(DataLoadedGuard);
    starshipGuardSpy = TestBed.inject(StarshipDataGuardService) as jasmine.SpyObj<StarshipDataGuardService>;
    peopleGuardSpy = TestBed.inject(PeopleDataGuardService) as jasmine.SpyObj<PeopleDataGuardService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation for starship battle type', () => {
    starshipGuardSpy.canActivate.and.returnValue(of(true));
    const result = guard.canActivate({ queryParams: { battle: 'starship' } } as any, null);
    expect(result).toBeTruthy();
  });

  it('should allow activation for people battle type', () => {
    peopleGuardSpy.canActivate.and.returnValue(of(true));
    const result = guard.canActivate({ queryParams: { battle: 'people' } } as any, null);
    expect(result).toBeTruthy();
  });

  it('should redirect to home for unknown battle type', () => {
    const result = guard.canActivate({ queryParams: { battle: 'unknown' } } as any, null);
    expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/']);
  });
});
