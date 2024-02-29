import { TestBed } from '@angular/core/testing';
import { PeopleFacade } from '@state/people';
import { StarshipsFacade } from '@state/starships';
import { of } from 'rxjs';
import { GameEngineService } from './GameEngineService';

describe('GameEngineService', () => {
  let service: GameEngineService;
  let peopleFacadeSpy: jasmine.SpyObj<PeopleFacade>;
  let starshipsFacadeSpy: jasmine.SpyObj<StarshipsFacade>;

  beforeEach(() => {
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
});
