import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tag-input',
  imports: [CommonModule],
  templateUrl: './tag-input.component.html',
  styleUrl: './tag-input.component.scss'
})
export class TagInputComponent {
  @Input() tagText: string = '';
  @Input() width: string = '266px';
  @Input() height: string = '44px';
  @Input() labelText: string = '';
  @Input() placeholderText: string = '';
  @Input() error: boolean = false;
  @Input() errorMessage: string = '';
  @Output() deleteTag = new EventEmitter<void>();
  @Output() tagTextChanged = new EventEmitter<string>();

  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.tagText = input.value;
    this.tagTextChanged.emit(input.value);
  }

  onDelete(): void {
    this.tagText = '';
    this.tagTextChanged.emit('');
    if (this.inputElement?.nativeElement) {
      this.inputElement.nativeElement.value = '';
    }
    this.deleteTag.emit();
  }
}