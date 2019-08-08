import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GameComponent } from './controllers/game.component';

import { LevelsService } from './services/levels';
import { ScoreService } from './services/score';

import { ProgressDirective } from './directives/progress.directive';
import { TapDirective } from './directives/tap.directive';

import { City4LevelGenerator } from './modules/level.generator.city4';

@NgModule({
  declarations: [
    GameComponent,
    ProgressDirective,
    TapDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [LevelsService, ScoreService, City4LevelGenerator],
  bootstrap: [GameComponent]
})
export class AppModule { }
