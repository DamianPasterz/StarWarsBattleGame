import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BattleModeSelectionComponent } from './battle-mode-selection.component';
import { BattleTypeCardComponent } from './battle-type-card/battle-type-card.component';

describe('BattleModeSelectionComponent', () => {
  let component: BattleModeSelectionComponent;
  let fixture: ComponentFixture<BattleModeSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BattleModeSelectionComponent, BattleTypeCardComponent],
      imports: [MatCardModule, RouterModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(BattleModeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
