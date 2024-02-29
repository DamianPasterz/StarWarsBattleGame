/* eslint-disable @ngrx/no-reducer-in-key-names */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_CONFIG } from '@core/config';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { LoadingComponent } from './shared/loading/loading.component';
import { StartBoardComponent } from './start-board/start-board.component';
import { effects, facades, reducer } from './state';

@NgModule({
  declarations: [AppComponent, StartBoardComponent],
  providers: [...facades, DatePipe, { provide: APP_CONFIG, useValue: APP_CONFIG }],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducer, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    LoadingComponent,
  ],
})
export class AppModule {}
