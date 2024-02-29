import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { of } from 'rxjs';
import { MyToolbarComponent } from './my-toolbar.component';

describe('MyToolbarComponent', () => {
  let component: MyToolbarComponent;
  let fixture: ComponentFixture<MyToolbarComponent>;
  let breakpointObserver: jasmine.SpyObj<BreakpointObserver>;

  beforeEach(async () => {
    // Mock BreakpointObserver
    breakpointObserver = jasmine.createSpyObj('BreakpointObserver', ['observe']);
    // Correctly mock the observe method to return an Observable<BreakpointState>
    breakpointObserver.observe.and.returnValue(
      of({
        matches: true,
        breakpoints: {
          [Breakpoints.Handset]: true,
          [Breakpoints.HandsetLandscape]: false,
          [Breakpoints.HandsetPortrait]: true,
          [Breakpoints.Tablet]: false,
          [Breakpoints.Web]: false,
          [Breakpoints.XSmall]: false,
          [Breakpoints.Small]: false,
          [Breakpoints.Medium]: false,
          [Breakpoints.Large]: false,
          [Breakpoints.XLarge]: false,
        },
      } as BreakpointState)
    );

    await TestBed.configureTestingModule({
      declarations: [MyToolbarComponent],
      imports: [MatToolbarModule, MatMenuModule, MatIconModule],
      providers: [{ provide: BreakpointObserver, useValue: breakpointObserver }],
    }).compileComponents();

    fixture = TestBed.createComponent(MyToolbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect handset viewport', () => {
    expect(component.isHandset$).toBeTruthy();
    component.isHandset$.subscribe((isHandset) => {
      expect(isHandset).toBeTrue();
    });
  });
});
