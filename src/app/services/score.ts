import { Subject } from 'rxjs';

import { Score } from '../data/score.type';

export class ScoreService {
    
    constructor() {
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
    }

    refresh(){
        this.currentScore = {
            scores: 0,
            time: 0,
            answers: 0
        };
    }
    
}