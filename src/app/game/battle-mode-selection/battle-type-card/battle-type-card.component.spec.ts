import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { BattleTypeCardComponent } from './battle-type-card.component';

describe('BattleTypeCardComponent', () => {
  let component: BattleTypeCardComponent;
  let fixture: ComponentFixture<BattleTypeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BattleTypeCardComponent],
      imports: [MatCardModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BattleTypeCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title, routerLink, and queryParams as inputs', () => {
    expect(component.title).toBeUndefined();
    expect(component.routerLink).toBeUndefined();
    expect(component.queryParams).toBeUndefined();

    component.title = 'Test Title';
    component.routerLink = ['/test'];
    component.queryParams = { param: 'value' };

    expect(component.title).toBe('Test Title');
    expect(component.routerLink).toEqual(['/test']);
    expect(component.queryParams).toEqual({ param: 'value' });
  });
});
