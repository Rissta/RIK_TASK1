import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../directives/click-outside.directive';

@Component({
  selector: 'app-date-input',
  imports: [CommonModule, FormsModule, ClickOutsideDirective],
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.scss'
})
export class DateInputComponent {
  @Input() dateText: string = '';
  @Input() width: string = '266px';
  @Input() height: string = '44px';
  @Input() labelText: string = '';
  @Input() placeholderText: string = '';
  @Input() error: boolean = false;
  @Input() errorMessage: string = '';
  @Output() dateTextChanged = new EventEmitter<string>();
  
  showCalendar: boolean = false;
  selectedDate: string = '';

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dateText = input.value;
    this.dateTextChanged.emit(input.value);
  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
    if (this.showCalendar && this.dateText) {
      this.selectedDate = this.formatDateForInput(this.dateText);
    }
  }

  onDateSelected(): void {
    if (this.selectedDate) {
      this.dateText = this.formatDateForDisplay(this.selectedDate);
      this.dateTextChanged.emit(this.dateText);
      this.showCalendar = false;
    }
  }

  private formatDateForDisplay(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  private formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}