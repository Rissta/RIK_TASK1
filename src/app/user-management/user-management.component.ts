import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { HttpClientModule } from '@angular/common/http';
import { MockApiService, User } from '../services/mock-api.service';
import { LineTableComponent } from '../line-table/line-table.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-management',
  imports: [FilterComponent, LineTableComponent, CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent implements OnInit {
  public users: any[] = [];
  public displayedUsers: User[] = [];
  public selectedUsers: User[] = [];
  public showFiltr: boolean = false;
  public useFilter: boolean = false;
  public isLoading: boolean = false;
  public errorMessage: string | null = null;
  constructor(private mockApiService: MockApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.mockApiService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.displayedUsers = data;
        this.isLoading = false;
        // console.log('Полученные данные:', data);
      },
      error: (error: any) => {
        this.isLoading = false;
        this.errorMessage = 'Ошибка при загрузке пользователей';
        console.error('Ошибка при получении данных:', error);
      }
    });
  }

  toggleUserStatus(userId: number, userState : boolean): void {
    this.mockApiService.toggleUserStatus(userId, userState).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (error: any) => {
        console.error('Ошибка при изменении статуса:', error);
      }
    });
  }

  onFilteredUsers(users: User[]) {
    this.displayedUsers = users;
  }

  onSelectedUsers(users: User[]) {
    this.selectedUsers = users;
    console.log(this.selectedUsers)
  }
  
  blockUsers() : void {
    this.selectedUsers.forEach((user) => {
      this.mockApiService.toggleUserStatus(user.id, false);
    })
  }

  unblockUsers() : void {
    this.selectedUsers.forEach((user) => {
      this.mockApiService.toggleUserStatus(user.id, true);
    })
  }
}


  // constructor(private ApiService: ApiService) {}
  // ngOnInit(): void {
  //   this.ApiService.getUsers().subscribe({
  //     next: (data) => {
  //       console.log('Полученные данные:', data);
  //     },
  //     error: (error) => {
  //       console.error('Ошибка при получении данных:', error);
  //     }
  //   });
  // }