import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<Event>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  public onClick(event: Event): void {
    const targetElement = event.target as HTMLElement;
    if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
      this.clickOutside.emit(event);
    }
  }
}