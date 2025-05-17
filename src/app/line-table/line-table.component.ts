import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserData } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { CustomCheckboxComponent } from '../custom-checkbox/custom-checkbox.component';
import { CustomSelectTableComponent } from '../custom-select-table/custom-select-table.component';


@Component({
  selector: 'app-line-table',
  imports: [CommonModule, CustomCheckboxComponent, CustomSelectTableComponent],
  templateUrl: './line-table.component.html',
  styleUrl: './line-table.component.scss'
})
export class LineTableComponent {
  @Input() records: UserData[] = [];
  @Input() totalRecords: number = 0;
  @Input() pageSize: number = 3;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  @Output() selectionChange = new EventEmitter<UserData[]>();
  @Output() action = new EventEmitter<{action: string, record: UserData}>();

  get selectedRecords(): UserData[] {
    return this.records.filter(record => record.selected);
  }

  get selectedCount(): number {
    return this.selectedRecords.length;
  }

  get displayRange(): string {
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.totalRecords);
    return `${start} - ${end} из ${this.totalRecords}`;
  }

  get displayedRecords(): UserData[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.records.slice(start, end);
  }

  toggleSelectAll(checked: boolean): void {
    this.records.forEach(record => record.selected = checked);
    this.selectionChange.emit(this.selectedRecords);
  }

  toggleSelectRecord(record: UserData): void {
    record.selected = !record.selected;
    this.selectionChange.emit(this.selectedRecords);
  }

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }

  onPageSizeChange(size : number): void {
    if(size !== undefined)
    this.pageSize = size;
    this.currentPage = 1;
  }

  onAction(actionName: string, record: UserData): void {
    this.action.emit({action: actionName, record});
  }

  getPageSizeOptions(): {value: number, label: string}[] {
    const options = [];
    const maxOption = Math.min(50, this.records.length);
    
    for (let i = 1; i <= maxOption; i += 1) {
      options.push({value: i, label: i.toString()});
    }

    if (this.pageSize % 1 !== 0 && !options.some(opt => opt.value === this.pageSize)) {
      options.push({value: this.pageSize, label: this.pageSize.toString()});
      options.sort((a, b) => a.value - b.value);
    }
    return options;
  }

  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  // goToFirstPage(): void {
  //   if (this.currentPage !== 1) {
  //     this.currentPage = 1;
  //     this.pageChange.emit(this.currentPage);
  //   }
  // }

  // goToPreviousPage(): void {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     this.pageChange.emit(this.currentPage);
  //   }
  // }

  // goToNextPage(): void {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //     this.pageChange.emit(this.currentPage);
  //   }
  // }

  // goToLastPage(): void {
  //   if (this.currentPage !== this.totalPages) {
  //     this.currentPage = this.totalPages;
  //     this.pageChange.emit(this.currentPage);
  //   }
  // }

  public formatDate(date: Date): string {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return '';
  }
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  public formatPhoneNumber(value: string): string {
    if (!value) return '';
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

}