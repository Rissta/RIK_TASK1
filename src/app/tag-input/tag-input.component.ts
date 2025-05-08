import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tag-input',
  imports: [],
  templateUrl: './tag-input.component.html',
  styleUrl: './tag-input.component.scss'
})
export class TagInputComponent {
  @Input() tagText: string = '';
  @Input() showCloseButton: boolean = true;
  @Input() width: string = '266px';

  @Output() deleteTag = new EventEmitter<void>();
  @Output() tagTextChanged = new EventEmitter<string>();

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.tagTextChanged.emit(input.value);
  }

  onDelete(): void {
    this.deleteTag.emit();
  }
}