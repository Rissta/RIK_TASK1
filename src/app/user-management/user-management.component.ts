import { Component } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';


@Component({
  selector: 'app-user-management',
  imports: [FilterComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent {
  public tagName: string = '';
  public tagDate: string = '';
  public dateHasError: boolean = false;
  public selectedValue: any = undefined;
  handleDelete(): void {
    console.log('Тег удален');
  }

  onTagTextChanged(newText: string): void {
    this.tagName = newText;
    console.log(this.selectedValue)
  }
  onDateChanged(newText: string): void {
    this.tagDate = newText;
    console.log(newText)
    
  }
  onSelectChanged(newText: string): void {
    this.selectedValue = newText;
    console.log(newText)
  }
  

}
