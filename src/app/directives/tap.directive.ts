import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[tap]'
})
export class TapDirective {

    element: any;

    constructor(el: ElementRef) {
        this.element = el.nativeElement;
    }

    @HostListener( 'touchstart' ) onStart() {
        this.element.classList.add( 'tap--start' );
    }

    @HostListener( 'touchmove' ) onMove() {
        this.element.classList.add( 'tap--move' );
    }

    @HostListener( 'touchend' ) onEnd() {
        this.element.classList.remove( 'tap--start' );
        this.element.classList.remove( 'tap--move' );
    }

}