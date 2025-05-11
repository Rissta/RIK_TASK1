import { CommonModule } from '@angular/common';
import {  Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-checkbox',
  imports: [CommonModule],
  templateUrl: './custom-checkbox.component.html',
  styleUrl: './custom-checkbox.component.scss'
})
export class CustomCheckboxComponent {
  @Input() checked= false;
  @Input() disabled = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.checkedChange.emit(this.checked);
  }
}
