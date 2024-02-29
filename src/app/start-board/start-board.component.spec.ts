// // import { ComponentFixture, TestBed } from '@angular/core/testing';

// // import { StartBoardComponent } from './start-board.component';

// // describe('StartBoardComponent', () => {
// //   let component: StartBoardComponent;
// //   let fixture: ComponentFixture<StartBoardComponent>;

// //   beforeEach(() => {
// //     TestBed.configureTestingModule({
// //       declarations: [StartBoardComponent]
// //     });
// //     fixture = TestBed.createComponent(StartBoardComponent);
// //     component = fixture.componentInstance;
// //     fixture.detectChanges();
// //   });

// //   it('should create', () => {
// //     expect(component).toBeTruthy();
// //   });
// // });

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { of } from 'rxjs';
// import { StartBoardComponent } from './start-board.component';
// import { GlobalsFacade } from '@state/globals';

// describe('StartBoardComponent', () => {
//  let component: StartBoardComponent;
//  let fixture: ComponentFixture<StartBoardComponent>;
//  let globalsFacadeSpy: jasmine.SpyObj<GlobalsFacade>;

//  beforeEach(async () => {
//     const globalsFacade = jasmine.createSpyObj('GlobalsFacade', ['loading$']);
//     await TestBed.configureTestingModule({
//       declarations: [ StartBoardComponent ],
//       providers: [
//         { provide: GlobalsFacade, useValue: globalsFacade }
//       ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(StartBoardComponent);
//     component = fixture.componentInstance;
//     globalsFacadeSpy = TestBed.inject(GlobalsFacade) as jasmine.SpyObj<GlobalsFacade>;
//     globalsFacadeSpy.loading$.and.returnValue(of(false));
//  });

//  it('should create', () => {
//     expect(component).toBeTruthy();
//  });

//  it('should start with textAnimationState as "start"', () => {
//     expect(component.textAnimationState).toBe('start');
//  });

//  it('should change textAnimationState to "end" when animationDone is called', () => {
//     component.animationDone({ fromState: 'start', toState: 'end', totalTime: 0, phaseName: 'done' } as any);
//     expect(component.textAnimationState).toBe('end');
//  });

//  it('should show button when animationDone is called from "start" state', () => {
//     component.animationDone({ fromState: 'start', toState: 'end', totalTime: 0, phaseName: 'done' } as any);
//     expect(component.showButton).toBeTrue();
//  });

//  it('should not show button when animationDone is called from a state other than "start"', () => {
//     component.animationDone({ fromState: 'end', toState: 'start', totalTime: 0, phaseName: 'done' } as any);
//     expect(component.showButton).toBeFalse();
//  });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalsFacade } from '@state/globals';
import { of } from 'rxjs';
import { StartBoardComponent } from './start-board.component';

describe('StartBoardComponent', () => {
  let component: StartBoardComponent;
  let fixture: ComponentFixture<StartBoardComponent>;
  let globalsFacadeSpy: jasmine.SpyObj<GlobalsFacade>;

  beforeEach(async () => {
    const globalsFacade = jasmine.createSpyObj('GlobalsFacade', [], { loading$: of(false) });

    await TestBed.configureTestingModule({
      declarations: [StartBoardComponent],
      providers: [{ provide: GlobalsFacade, useValue: globalsFacade }],
    }).compileComponents();

    fixture = TestBed.createComponent(StartBoardComponent);
    component = fixture.componentInstance;
    globalsFacadeSpy = TestBed.inject(GlobalsFacade) as jasmine.SpyObj<GlobalsFacade>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with textAnimationState as "start"', () => {
    expect(component.textAnimationState).toBe('start');
  });

  it('should change textAnimationState to "end" when animationDone is called', () => {
    component.animationDone({ fromState: 'start', toState: 'end', totalTime: 0, phaseName: 'done' } as any);
    expect(component.textAnimationState).toBe('end');
  });

  it('should show button when animationDone is called from "start" state', () => {
    component.animationDone({ fromState: 'start', toState: 'end', totalTime: 0, phaseName: 'done' } as any);
    expect(component.showButton).toBeTrue();
  });

  it('should not show button when animationDone is called from a state other than "start"', () => {
    component.animationDone({ fromState: 'end', toState: 'start', totalTime: 0, phaseName: 'done' } as any);
    expect(component.showButton).toBeFalse();
  });
});
