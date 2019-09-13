import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[progress]'
})

export class ProgressDirective implements OnChanges{

    @Input( 'progress' ) progress: Object;

    element: any;

    constructor( el: ElementRef ){
        this.element = el.nativeElement;
    }

    ngOnChanges( changes ){

        let line = this.element.querySelector( '.progress__line' );

        if( changes.progress && line ){
            let percent = ( 1-( changes.progress.currentValue.current-1 )/( changes.progress.currentValue.max-1) )*100;
            
            if( percent >= 50 ){
                line.classList.add( 'is-medium' );
            }
            if( percent >= 80 ){
                line.classList.add( 'is-over' );
            }
            if( percent < 50 ){
                line.classList.remove( 'is-medium', 'is-over' );
            }

            line.style = `transform: translateX(-${percent}%)`;
        }
        
    }

}