import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHostbinder]',
  standalone: true
})
export class HostbinderDirective {

  constructor() { }

  @HostBinding('style.cursor') cursor!:string
  @HostBinding('style.backgroundColor') bgcolor!:string

  @HostListener('mouseenter') onmouseenter(event: Event){
    this.cursor = 'pointer'
    this.bgcolor = 'green'
  }

  @HostListener('mouseleave') onmouseleave(event: Event){
    this.bgcolor = 'rgb(15, 176, 240)'
  }

  @HostListener('click') onclick(event: Event){
    console.log("Clicked from host binder");
  }

}
