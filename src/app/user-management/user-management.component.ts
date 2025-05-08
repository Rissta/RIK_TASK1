import { Component } from '@angular/core';
import { TagInputComponent } from '../tag-input/tag-input.component';


@Component({
  selector: 'app-user-management',
  imports: [TagInputComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent {
  onTagTextChanged(newText: string) {
    console.log('Новое значение:', newText);
  }
}
