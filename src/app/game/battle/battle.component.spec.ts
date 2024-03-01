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
    component.selectRandomCharacterOrShip({ name: 'test', crew: 1, manufacturer: 'testM', id: '1' });
    expect(gameEngineService.getRandomPeopleOpponent).not.toHaveBeenCalled();
    expect(gameEngineService.getRandomStarshipOpponent).not.toHaveBeenCalled();
  });

  it('should call fight when fight is called', () => {
    component.ngOnInit();
    component.fight();
    expect(gameEngineService.fight).toHaveBeenCalled();
  });
});
