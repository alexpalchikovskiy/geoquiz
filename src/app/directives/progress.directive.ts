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
        if( changes.progress ){
            let percent = ( 1-changes.progress.currentValue.current/changes.progress.currentValue.max )*100;
            
            if( percent >= 50 ){
                this.element.querySelector( '.progress__line' ).classList.add( 'is-medium' );
            }
            if( percent >= 80 ){
                this.element.querySelector( '.progress__line' ).classList.add( 'is-over' );
            }

            this.element.querySelector( '.progress__line' ).style = `transform: translateX(-${percent}%)`;
        }
    }

}