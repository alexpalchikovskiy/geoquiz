import countries from '../data/countries';

export class City4LevelGenerator{

    constructor(){}

    stopIndexes = [];

    public getLevel(){
        
        let index = this.getRandom( this.stopIndexes );
        this.stopIndexes.push( index );

        let level = {
            question: `${countries[ index ].name.split('(')[0].trim()}`,
            answers: this.generateAnswers( index, 4 ),
            score: 1,
            time: 10,
            last: false,
            data: {
                flag: countries[ index ].flag
            }
        }

        if( this.stopIndexes.length === countries.length ){
            level.last = true;
        }

        return level;
    }

    public refresh(){
        this.stopIndexes = [];
    }

    private generateAnswers( index, count ){
        let rightAnswer = {
            text: countries[ index ].capital,
            right: true
        };
        let answers = [ rightAnswer ];
        let stopIndexes = [ index ];

        for( let i = 1; i < count; i++  ){
            let ind = this.getRandom( stopIndexes );
            stopIndexes.push( ind );
            answers.push( {
                text: countries[ ind ].capital,
                right: false 
            } );
        }

        return this.shuffle( answers );
    }

    private getRandom( stopIndexes ){
        let random = Math.round( Math.random() * ( countries.length-1 ) );
        if( stopIndexes.includes( random ) ){
            random = this.getRandom( stopIndexes );
        }
        return random;
    }

    private shuffle( array ){
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor( Math.random() * currentIndex );
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

}