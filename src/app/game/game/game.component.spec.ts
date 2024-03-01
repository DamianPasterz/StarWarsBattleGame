import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MyToolbarComponent } from '@app/my-toolbar/my-toolbar.component';
import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(() => {
    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (str: string) => {
            return 'some value';
          },
        },
      },
    };
    TestBed.configureTestingModule({
      declarations: [GameComponent, MyToolbarComponent],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
      imports: [MatToolbarModule, RouterModule, MatMenuModule, MatIconModule],
    });
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
