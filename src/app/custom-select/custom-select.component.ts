import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClickOutsideDirective } from '../directives/click-outside.directive';

interface SelectOption {
  value: any;
  label: string;
}

@Component({
  selector: 'app-custom-select',
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent {
  @Input() options: SelectOption[] = [];
  @Input() selectedValue: any;
  @Input() width: string = '266px';
  @Input() height: string = '44px';
  @Input() labelText: string = '';
  @Input() placeholderText: string = '';
  @Input() fontSize: string = '16px'
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