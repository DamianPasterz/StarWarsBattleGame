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

  it('should have item as an input', () => {
    expect(component.item).toBeUndefined();
    component.item = { name: 'Test Item' };
    expect(component.item).toEqual({ name: 'Test Item' });
  });

  it('should emit itemClicked event when selectRandomCharacterOrShip is called', () => {
    spyOn(component.itemClicked, 'emit');
    const testName = 'Test Name';
    component.selectRandomCharacterOrShip(testName);
    expect(component.itemClicked.emit).toHaveBeenCalledWith(testName);
  });
});
