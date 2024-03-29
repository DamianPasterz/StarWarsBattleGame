import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { BattleOpponentsCardComponent } from './battle-opponents-card.component';

describe('BattleOpponentsCardComponent', () => {
  let component: BattleOpponentsCardComponent;
  let fixture: ComponentFixture<BattleOpponentsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BattleOpponentsCardComponent],
      imports: [MatCardModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BattleOpponentsCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
