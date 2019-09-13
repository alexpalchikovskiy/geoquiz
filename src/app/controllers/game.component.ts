import { Component, OnInit } from '@angular/core';

import { LevelsService } from '../services/levels';
import { ScoreService } from '../services/score';

import { Level } from '../data/level.type';
import { Score } from '../data/score.type';

import { interval } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: '../components/game.pug',
  styleUrls: ['../styles/game.scss']
})

export class GameComponent {

  constructor( 
    private levelsService: LevelsService,
    private scoreService: ScoreService
  ){}

  ngOnInit(){
    this.levelsService.levelUpdated.subscribe( level => this.level = level );
    this.scoreService.currentScoreUpdated.subscribe( () => this.score = this.scoreService.currentScore );
    this.scoreService.bestScoreUpdated.subscribe( () => this.bestScore = this.scoreService.bestScore );

    setTimeout( () => {
      this.loaded = true;
    }, 2000 );
  }

  level: Level;
  score: Score;
  bestScore: Score;

  status: String = 'waiting';
  lastAnswer: Boolean;
  levelOver: Boolean;
  timer: any;
  private intervalId: any;
  loaded: Boolean = false;

  startGame(){
    this.status = 'playing';

    this.levelsService.refresh();
    this.scoreService.refresh();

    this.score = this.scoreService.currentScore;
    this.bestScore = this.scoreService.bestScore;

    this.runLevel();
  }

  runLevel(){

    this.levelOver = false;

    this.levelsService.getNewLevel();
    this.timer = this.level.time;

    this.intervalId = setInterval( () => {

      this.timer--;
      if( this.timer <= 0 ){
        this.chooseAnswer( -1 );
      }

    }, 1000 );

  }

  chooseAnswer( index ){

    this.levelOver = true;

    clearInterval( this.intervalId );

    this.lastAnswer = this.level.answers[ index ] && this.level.answers[ index ].right === true;

    let delay = this.lastAnswer ? 500 : 2000;

    setTimeout( () => {
      if( this.lastAnswer && this.level.last === true ){
        this.scoreService.add( this.level.score, this.level.time );
        this.status = 'winner';
        this.scoreService.finish();
      }else if( this.lastAnswer ){
        this.scoreService.add( this.level.score, this.level.time );
        this.runLevel();
      }else{
        this.status = 'finish';
        this.scoreService.finish();
      }
    }, delay );

  }

}
