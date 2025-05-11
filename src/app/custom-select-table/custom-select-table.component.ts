import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClickOutsideDirective } from '../directives/click-outside.directive';

interface SelectOption {
  value: any;
  label: string;
}


@Component({
  selector: 'app-custom-select-table',
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './custom-select-table.component.html',
  styleUrl: './custom-select-table.component.scss'
})
export class CustomSelectTableComponent {
  @Input() options: SelectOption[] = [];
  @Input() selectedValue: any;
  @Input() width: string = '64px';
  @Input() height: string = '24px';
  @Input() labelText: string = '';
  @Input() placeholderText: string = '';
  @Output() valueChanged = new EventEmitter<any>();

  showDropdown = false;

  get selectedOption(): SelectOption | undefined {
    return this.options.find(opt => opt.value === this.selectedValue);
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  selectOption(option: SelectOption): void {
    if (this.selectedValue === option.value) {
      this.selectedValue = undefined;
      this.valueChanged.emit(undefined);
    } else {
      this.selectedValue = option.value;
      this.valueChanged.emit(option.value);
    }
    this.showDropdown = false;
  }
}