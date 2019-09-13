import countries from '../data/countries';

export class City4LevelGenerator{

    constructor(){
        countries.sort( ( a, b ) => a.difficult - b.difficult );
        let d1 = countries.filter( c => c.difficult === 1 ).length;
        let d2 = countries.filter( c => c.difficult === 2 ).length;
        let d3 = countries.filter( c => c.difficult === 3 ).length;
        this.difficults = [ d1, d2, d3 ];
        this.max = this.difficults[ this.currentDifficult ]-1;
    }

    stopIndexes = [];
    difficults = [];
    currentDifficult = 0;
    min = 0;
    max = 0;

    public getLevel(){
        
        let index = this.getRandom();
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
        let answers = [ {
            text: countries[ index ].capital,
            right: true
        } ];

        for( let i = 1; i < count; i++  ){
            answers.push( this.getRandomAnswer( answers ) );
        }

        return this.shuffle( answers );
    }

    private getRandomAnswer( answers ){
        let random = Math.round( Math.random() * ( countries.length-1 ) );
        let answer = {
            text: countries[ random ].capital,
            right: false
        };
        if( answers.filter( a => a.text === answer.text ).length ){
            answer = this.getRandomAnswer( answers );
        }
        return answer;
    }

    private getRandom(){
        if( this.stopIndexes.length === this.max+1 ){
            this.currentDifficult++;
            this.min = this.max+1;
            this.max += this.difficults[ this.currentDifficult ];
        }

        let random = Math.round( Math.random()*( this.max-this.min )+this.min );
        if( this.stopIndexes.includes( random ) ){
            random = this.getRandom();
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