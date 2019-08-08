import { City4LevelGenerator } from '../modules/level.generator.city4';

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Level } from '../data/level.type';

@Injectable()
export class LevelsService{

    constructor(
        private city4LevelGenerator: City4LevelGenerator 
    ){}
    
    levelUpdated = new Subject<Level>();
    levels: Level[];
    currentLevel: Level;

    getNewLevel(){
        let level = this.city4LevelGenerator.getLevel();
        this.currentLevel = level;
        this.levels.push( level );
        this.levelUpdated.next( level );
    }

    refresh(){
        this.levels = [];
        this.city4LevelGenerator.refresh();
    }
    
}