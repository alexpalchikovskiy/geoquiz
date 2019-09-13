import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Score } from '../data/score.type';

@Injectable()
export class ScoreService {
    
    constructor( private http: HttpClient ){
        let score = localStorage.getItem( 'bestScore' );
        if( score ){
            this.bestScore = JSON.parse( score );
        }else{
            this.bestScore = {
                scores: 0,
                time: 0,
                answers: 0
            }
        }

    }

    currentScore: Score;
    bestScore: Score;
    currentScoreUpdated = new Subject<Score>();
    bestScoreUpdated = new Subject<Score>();

    add( score, time ){
        this.currentScore.scores += score;
        this.currentScore.time += time;

        this.currentScoreUpdated.next();

        if( this.currentScore.scores > this.bestScore.scores ){
            this.bestScore = this.currentScore;
            this.bestScoreUpdated.next();
        }
    }

    finish(){
        localStorage.setItem( 'bestScore', JSON.stringify( this.bestScore ) );
        
        if( location.search ){
            let request = this.http.get( `https://badgamebot.ovobox.com/callback_game/${location.search}&score=${this.bestScore.scores}` ).subscribe();
        }
    }

    refresh(){
        this.currentScore = {
            scores: 0,
            time: 0,
            answers: 0
        };
    }
    
}