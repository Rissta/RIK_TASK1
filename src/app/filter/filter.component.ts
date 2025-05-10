import { Component } from '@angular/core';
import { TagInputComponent } from '../tag-input/tag-input.component';
import { DateInputComponent } from "../date-input/date-input.component";
import { CustomSelectComponent } from '../custom-select/custom-select.component';
@Component({
  selector: 'app-filter',
  imports: [TagInputComponent, DateInputComponent, CustomSelectComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  public login: string = '';
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
      console.log(this.formattedPhone)
      this.errorPhone = (this.formattedPhone !== '+7' && this.formattedPhone !== '') ? (!this.isValidPhoneFormat(this.formattedPhone) || this.formattedPhone.length!=18) : false
      this.errorMail = !this.isValidEmail(this.mail) && this.mail!='';
      console.log( this.dateOfChange)
      this.ErrorDateOfCreation = this.dateOfCreation !== '' ? !this.isValidDateeFormat(this.dateOfCreation) : false;
      this.ErrorDateOfChange = this.dateOfChange !== '' ? !this.isValidDateeFormat(this.dateOfChange) : false;
  }
}
