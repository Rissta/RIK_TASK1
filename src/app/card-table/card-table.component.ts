import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../services/mock-api.service';
import { CommonModule } from '@angular/common';
import { CustomCheckboxComponent } from '../custom-checkbox/custom-checkbox.component';
import { CustomSelectTableComponent } from '../custom-select-table/custom-select-table.component';
import { CustomSelectComponent } from "../custom-select/custom-select.component";


@Component({
  selector: 'app-card-table',
  imports: [CommonModule, CustomCheckboxComponent, CustomSelectTableComponent, CustomSelectComponent],
  templateUrl: './card-table.component.html',
  styleUrl: './card-table.component.scss'
})
export class CardTableComponent {
  @Input() records: User[] = [];
  @Input() totalRecords: number = 0;
  @Input() pageSize: number = 20;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  @Output() selectionChange = new EventEmitter<User[]>();
  @Output() action = new EventEmitter<{action: string, record: User}>();
  public sortValue : string = 'login';
  public allSelect : boolean = false;

  get selectedRecords(): User[] {
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

  get displayedRecords(): User[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.records.slice(start, end);
  }

  toggleSelectAll(checked: boolean): void {
    this.records.forEach(record => record.selected = checked);
    this.selectionChange.emit(this.selectedRecords);
    this.allSelect = checked;
  }

  toggleSelectRecord(record: User): void {
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

  onAction(actionName: string, record: User): void {
    this.action.emit({action: actionName, record});
  }

  getPageSizeOptions(): {value: number, label: string}[] {
    const options = [];
    const maxOption = Math.min(50, this.records.length);
    
    for (let i = 10; i <= maxOption; i += 10) {
      options.push({value: i, label: i.toString()});
    }
    return options;
  }

  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  goToFirstPage(): void {
    if (this.currentPage !== 1) {
      this.currentPage = 1;
      this.pageChange.emit(this.currentPage);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  goToLastPage(): void {
    if (this.currentPage !== this.totalPages) {
      this.currentPage = this.totalPages;
      this.pageChange.emit(this.currentPage);
    }
  }

  onSortChanged(value: string): void {
    this.sortValue = value;
  
    const field = value as keyof User;
  
    this.records = [...this.records].sort((a, b) => {
      const aStr = String(a[field]).toLowerCase();
      const bStr = String(b[field]).toLowerCase();
  
      if (aStr < bStr) return -1;
      if (aStr > bStr) return 1;
      return 0;
    });
  }
}