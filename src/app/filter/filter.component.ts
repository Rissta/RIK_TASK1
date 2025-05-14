import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TagInputComponent } from '../tag-input/tag-input.component';
import { DateInputComponent } from "../date-input/date-input.component";
import { CustomSelectComponent } from '../custom-select/custom-select.component';
import { User } from '../services/mock-api.service';

@Component({
  selector: 'app-filter',
  imports: [TagInputComponent, DateInputComponent, CustomSelectComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Output() filteredUsers = new EventEmitter<User[]>();
  public login: string = '';
  @Input() users: User[] = [];
  public mail: string = '';
  public errorMail: boolean = false;
  public phoneNumber: string = '7';
  public formattedPhone: string = '+7';
  public errorPhone: boolean = false;
  public dateOfChange: string = '';
  public ErrorDateOfChange: boolean = false;
  public dateOfCreation: string = '';
  public ErrorDateOfCreation: boolean = false;
  public status: any = undefined; 
  public role: any = undefined; 
  @Input() inputWidth: string = "266px";
  @Input() inputHigth: string = "44px";

  // Телефон
  handleDelete(): void {
    console.log('Тег удален');
  }

  phoneDelete(): void {
    this.phoneNumber = '';
    this.formattedPhone = '+7';
  }

  onPhoneChanged(newText: string): void {
    this.phoneNumber = newText.replace(/\D/g, '');
    if(this.phoneNumber.length > 11)
      this.phoneNumber = this.phoneNumber.substring(0, 10);
    this.formattedPhone = this.formatPhoneNumber(this.phoneNumber);
  }
  private formatPhoneNumber(value: string): string {
    if (!value) return '+7';
    let formattedValue = '+7';
    if (!value.startsWith('7'))
      value = '7' + value;
    if (value.length > 1)
      formattedValue += ' (' + value.substring(1, 4);
    if (value.length > 4)
      formattedValue += ') ' + value.substring(4, 7);
    if (value.length > 7)
      formattedValue += '-' + value.substring(7, 9);
    if (value.length > 9)
      formattedValue += '-' + value.substring(9, 11);
    return formattedValue;
  }

  private isValidPhoneFormat(phone: string): boolean {
    const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    return phonePattern.test(phone);
  }

  onLoginChanged(newText: string): void {
    this.login = newText;
  }

  // Меил
  onMailChanged(newText: string): void {
    this.mail = newText;
  }

  private isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  // Дата
  onDateOfChangeChanged(newText: string): void {
    this.dateOfChange = newText;
  }

  onDateOfCreationnChanged(newText: string): void {
    this.dateOfCreation = newText;
  }

  // Селект
  onStatusChanged(newText: string): void {
    this.status = newText;
  }

  onRoleChanged(newText: string): void {
    this.role = newText;
  }

  private isValidDateeFormat(date: string): boolean {
    const phonePattern = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;
    return phonePattern.test(date);
  }

  public checkErrors() : void{
      this.errorPhone = (this.formattedPhone !== '+7' && this.formattedPhone !=='') ? (!this.isValidPhoneFormat(this.formattedPhone) || this.formattedPhone.length!=18) : false
      this.errorMail = !this.isValidEmail(this.mail) && this.mail !=='';
      this.ErrorDateOfCreation = this.dateOfCreation !== '' ? !this.isValidDateeFormat(this.dateOfCreation) : false;
      this.ErrorDateOfChange = this.dateOfChange !== '' ? !this.isValidDateeFormat(this.dateOfChange) : false;
  }

  

  setUsers(users: User[]): void {
    this.users = users;
    this.applyFilters();
  }
  applyFilters(): void {
    this.checkErrors();
    let filtered = [...this.users];
    if (this.login) {
      filtered = filtered.filter(user => 
        user.login.toLowerCase().includes(this.login.toLowerCase())
      );
    }
    if (this.mail && !this.errorMail) {
      filtered = filtered.filter(user => 
        user.email.toLowerCase().includes(this.mail.toLowerCase())
      );
    }
    if (this.formattedPhone !== '+7' && !this.errorPhone) {
      const cleanPhone = this.formattedPhone.replace(/\D/g, '');
      filtered = filtered.filter(user => 
        user.phone.replace(/\D/g, '').includes(cleanPhone)
      );
    }
    if (this.dateOfChange && !this.ErrorDateOfChange) {
      filtered = filtered.filter(user => 
        user.updatedAt === this.dateOfChange
      );
    }
    if (this.dateOfCreation && !this.ErrorDateOfCreation) {
      filtered = filtered.filter(user => 
        user.createdAt === this.dateOfCreation
      );
    }
    if (this.status !== undefined) {
      const activeStatus = this.status;
      filtered = filtered.filter(user => 
        user.isActive === activeStatus
      );
    }
    if (this.role !== undefined) {
      filtered = filtered.filter(user => 
        user.role === this.role
      );
    }
    this.filteredUsers.emit(filtered);
  }
  cancelFilters() : void {
    this.filteredUsers.emit(this.users);
  }
  clearFilters() : void {
    this.login = '';
    this.mail = '';
    this.formattedPhone = '+7';
    this.phoneNumber = '';
    this.dateOfChange = '';
    this.dateOfCreation = '';
    this.status = undefined;
    this.role = undefined;
  }
}
