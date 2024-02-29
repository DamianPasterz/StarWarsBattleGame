// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
// import { GameEngineService } from '@core/services/game-engine.service';
// import { of } from 'rxjs';
// import { BattleComponent } from './battle.component';

// describe('BattleComponent', () => {
//   let component: BattleComponent;
//   let fixture: ComponentFixture<BattleComponent>;
//   let mockActivatedRoute: ActivatedRoute;
//   let mockGameEngineService: jasmine.SpyObj<GameEngineService>;
//   const peopleOponentsMock = {
//     oponentOne: {
//       name: 'Luke Skywalker',
//       mass: 77, // Example value, replace with actual data
//       homeworld: '1', // Example value, replace with actual data
//       id: '1', // Example value, replace with actual data
//     },
//     oponentTwo: {
//       name: 'Leia Organa',
//       mass: 59, // Example value, replace with actual data
//       homeworld: '2', // Example value, replace with actual data
//       id: '2', // Example value, replace with actual data
//     },
//   };

//   const starshipOponentsMock = {
//     oponentOne: {
//       name: 'Millennium Falcon',
//       id: '1', // Example value, replace with actual data
//       manufacturer: 'Corellian Engineering Corporation', // Example value, replace with actual data
//       crew: 4, // Example value, replace with actual data
//     },
//     oponentTwo: {
//       name: 'Death Star',
//       id: '2', // Example value, replace with actual data
//       manufacturer: 'Imperial Department of Military Research', // Example value, replace with actual data
//       crew: 342953, // Example value, replace with actual data
//     },
//   };
//   const winnerMock = 'Luke Skywalker';

//   beforeEach(async () => {
//     const paramMap = new Map<string, string>();
//     paramMap.set('battle', 'people');
//     const queryParamMap = new Map<string, string>();
//     queryParamMap.set('battle', 'people');

//     mockActivatedRoute = {
//       snapshot: {
//         queryParams: { battle: 'people' },
//         paramMap: convertToParamMap(paramMap),
//         queryParamMap: convertToParamMap(queryParamMap),
//         url: [],
//         fragment: '',
//         data: {},
//         outlet: '',
//         component: null,
//         routeConfig: null,
//         root: null,
//         parent: null,
//         firstChild: null,
//         children: [],
//         pathFromRoot: [],
//       } as unknown as ActivatedRouteSnapshot,
//     } as any;

//     mockGameEngineService = jasmine.createSpyObj('GameEngineService', [
//       'initialGame',
//       'getRandomPeopleOpponent',
//       'getRandomStarshipOpponent',
//       'fight',
//     ]);
//     await TestBed.configureTestingModule({
//       declarations: [BattleComponent],
//       providers: [
//         { provide: ActivatedRoute, useValue: mockActivatedRoute },
//         { provide: GameEngineService, useValue: mockGameEngineService },
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(BattleComponent);
//     component = fixture.componentInstance;
//     spyOnProperty(component, 'peopleOponents$').and.returnValue(of(peopleOponentsMock));
//     spyOnProperty(component, 'starshipOponents$').and.returnValue(of(starshipOponentsMock));
//     spyOnProperty(component, 'winner$').and.returnValue(of(winnerMock));
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize with query params', () => {
//     expect(component.queryParams).toBe('people');
//     expect(mockGameEngineService.initialGame).toHaveBeenCalledWith('people');
//   });

//   it('should select random character or ship', () => {
//     component.selectRandomCharacterOrShip(null);
//     expect(mockGameEngineService.getRandomPeopleOpponent).toHaveBeenCalled();
//   });

//   it('should fight', () => {
//     component.fight();
//     expect(mockGameEngineService.fight).toHaveBeenCalled();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { GameEngineService } from '@core/services/game-engine.service';
import { BattleComponent } from './battle.component';

describe('BattleComponent', () => {
  let component: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;
  let gameEngineService: jasmine.SpyObj<GameEngineService>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    const gameEngineServiceSpy = jasmine.createSpyObj('GameEngineService', [
      'peopleOponentsObservable$',
      'starshipOponentsObservable$',
      'winnerNameObservable$',
      'initialGame',
      'getRandomPeopleOpponent',
      'getRandomStarshipOpponent',
      'fight',
    ]);

    await TestBed.configureTestingModule({
      declarations: [BattleComponent],
      providers: [
        { provide: GameEngineService, useValue: gameEngineServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParams: { battle: 'people' } } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BattleComponent);
    component = fixture.componentInstance;
    gameEngineService = TestBed.inject(GameEngineService) as jasmine.SpyObj<GameEngineService>;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with queryParams from route', () => {
    component.ngOnInit();
    expect(component.queryParams).toBe('people');
  });

  it('should call initialGame with queryParams', () => {
    component.ngOnInit();
    expect(gameEngineService.initialGame).toHaveBeenCalledWith('people');
  });

  it('should select random character when selectRandomCharacterOrShip is called with "people"', () => {
    component.ngOnInit();
    component.queryParams;
    component.selectRandomCharacterOrShip(null);
    expect(gameEngineService.getRandomPeopleOpponent).toHaveBeenCalled();
  });

  it('should not select random character or ship when selectRandomCharacterOrShip is called with name', () => {
    component.ngOnInit();
    component.queryParams;
    component.selectRandomCharacterOrShip('luck');
    expect(gameEngineService.getRandomPeopleOpponent).not.toHaveBeenCalled();
    expect(gameEngineService.getRandomStarshipOpponent).not.toHaveBeenCalled();
  });

  it('should call fight when fight is called', () => {
    component.ngOnInit();
    component.fight();
    expect(gameEngineService.fight).toHaveBeenCalled();
  });
});
