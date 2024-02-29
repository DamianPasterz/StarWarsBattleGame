// import { TestBed } from '@angular/core/testing';

// import { GameEngineService } from './game-engine.service';

// describe('GameEngineService', () => {
//   let service: GameEngineService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(GameEngineService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { BattleStats, PeopleFacade, PeopleProperties } from '@state/people';
import { StarshipProperties, StarshipsFacade } from '@state/starships';
import { of } from 'rxjs';
import { GameEngineService } from './game-engine.service';

describe('GameEngineService', () => {
  let service: GameEngineService;
  let peopleFacadeSpy: jasmine.SpyObj<PeopleFacade>;
  let starshipsFacadeSpy: jasmine.SpyObj<StarshipsFacade>;

  beforeEach(() => {
    // Mock PeopleFacade and StarshipsFacade
    peopleFacadeSpy = jasmine.createSpyObj('PeopleFacade', ['count$', 'selectByIndex', 'selectStatsById', 'setStats']);
    starshipsFacadeSpy = jasmine.createSpyObj('StarshipsFacade', [
      'count$',
      'selectByIndex',
      'selectStatsById',
      'setStats',
    ]);

    TestBed.configureTestingModule({
      providers: [
        GameEngineService,
        { provide: PeopleFacade, useValue: peopleFacadeSpy },
        { provide: StarshipsFacade, useValue: starshipsFacadeSpy },
      ],
    });

    service = TestBed.inject(GameEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize game with correct battle type', () => {
    service.initialGame('people');
    expect(service['battleType']).toBe('people');
  });

  it('should get random opponent index', (done) => {
    const mockCount = 5;
    peopleFacadeSpy.count$ = of(mockCount);
    service.getRandomOpponentIndex(peopleFacadeSpy).subscribe((index) => {
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(mockCount);
      done();
    });
  });

  it('should get random people opponent', (done) => {
    const mockPerson: PeopleProperties = { id: '1', name: 'Test Person', mass: 100, homeworld: '1' };
    peopleFacadeSpy.selectByIndex.and.returnValue(of(mockPerson));
    service.getRandomPeopleOpponent();
    service.peopleOponentsObservable$.subscribe((opponents) => {
      expect(opponents.oponentOne).toEqual(mockPerson);
      done();
    });
  });

  it('should get random starship opponent', (done) => {
    const mockStarship: StarshipProperties = {
      id: '1',
      name: 'Test Starship',
      crew: 100,
      manufacturer: 'testManufacturer',
    };
    starshipsFacadeSpy.selectByIndex.and.returnValue(of(mockStarship));
    service.getRandomStarshipOpponent();
    service.starshipOponentsObservable$.subscribe((opponents) => {
      expect(opponents.oponentOne).toEqual(mockStarship);
      done();
    });
  });

  it('should update or add stats for people', () => {
    const mockPerson: PeopleProperties = { id: '1', name: 'Test Person', mass: 100, homeworld: '1' };
    const mockStats: BattleStats = { id: '1', name: 'Test Person', win: 0, loss: 0, tie: 0 };
    peopleFacadeSpy.selectStatsById.and.returnValue(of(mockStats));
    service.updateOrAddStats(mockPerson, 'people', 'win');
    expect(peopleFacadeSpy.setStats).toHaveBeenCalledWith(mockStats);
  });

  it('should update or add stats for starships', () => {
    const mockStarship: StarshipProperties = {
      id: '1',
      name: 'Test Starship',
      crew: 100,
      manufacturer: 'testManufacturer',
    };
    const mockStats: BattleStats = { id: '1', name: 'Test Starship', win: 0, loss: 0, tie: 0 };
    starshipsFacadeSpy.selectStatsById.and.returnValue(of(mockStats));
    service.updateOrAddStats(mockStarship, 'starship', 'win');
    expect(starshipsFacadeSpy.setStats).toHaveBeenCalledWith(mockStats);
  });

  it('should fight with people', () => {
    const mockPersonOne: PeopleProperties = { id: '1', name: 'Test Person One', mass: 100, homeworld: '1' };
    const mockPersonTwo: PeopleProperties = { id: '2', name: 'Test Person Two', mass: 50, homeworld: '2' };
    service['peopleOponents$'].next({ oponentOne: mockPersonOne, oponentTwo: mockPersonTwo });
    service.fight();
    // Add assertions to check the outcome of the fight
  });

  it('should fight with starships', () => {
    const mockStarshipOne: StarshipProperties = {
      id: '1',
      name: 'Test Starship One',
      crew: 100,
      manufacturer: 'testManufacturer',
    };
    const mockStarshipTwo: StarshipProperties = {
      id: '2',
      name: 'Test Starship Two',
      crew: 50,
      manufacturer: 'testManufacturer',
    };
    service['starshipOponents$'].next({ oponentOne: mockStarshipOne, oponentTwo: mockStarshipTwo });
    service.fight();
    // Add assertions to check the outcome of the fight
  });
});
