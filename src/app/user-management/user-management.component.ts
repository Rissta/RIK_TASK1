import { WindowSizeService } from './../services/window-size.service';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { HttpClientModule } from '@angular/common/http';
import { MockApiService, User } from '../services/mock-api.service';
import { LineTableComponent } from '../line-table/line-table.component';
import { CommonModule } from '@angular/common';
import { async, fromEvent, map } from 'rxjs';
import { CardTableComponent } from '../card-table/card-table.component';


@Component({
  selector: 'app-user-management',
  imports: [FilterComponent, LineTableComponent, CardTableComponent, CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent implements OnInit {
  public users: any[] = [];
  public users1: any[] = [];
  public displayedUsers: User[] = [];
  public selectedUsers: User[] = [];
  public showFiltr: boolean = false;
  public useFilter: boolean = false;
  public isLoading: boolean = false;
  public changeTable: boolean = false;
  public errorMessage: string | null = null;
  public inputWidth: string = "266px";
  public inputHigth: string = "44px";
  constructor(private mockApiService: MockApiService, private WindowSizeService: WindowSizeService, private ApiService: ApiService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.ResizeScreen();
    this.loadUsers1()
  }

  ResizeScreen(): void {
    this.WindowSizeService.onResize().subscribe(width => {
      if(width >= 1600){
        this.inputWidth = "266px";
        this.inputHigth = "44px";
      } 
      else if(width >= 1440){
        this.inputWidth = "294px";
        this.inputHigth = "44px";
      }
      else if(width >= 1024){
        this.inputWidth = "264px";
        this.inputHigth = "36px";
      }
      else if(width >= 768){
        this.inputWidth = "292px";
        this.inputHigth = "36px";
      }
      else if(width >= 600){
        this.inputWidth = "288px";
        this.inputHigth = "36px";
      }
      if(width < 1024){
        this.changeTable = true;
      } 
      else {
        this.changeTable = false;
      }
    });
  }

  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = null;

    try {
      this.users = this.mockApiService.getUsers();
      this.displayedUsers = [...this.users];
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      this.errorMessage = 'Ошибка при загрузке пользователей';
      console.error('Ошибка при получении данных:', error);
    }
  }

  toggleUserStatus(userId: number, userState: boolean): void {
    this.mockApiService.toggleUserStatus(userId, userState);
    this.loadUsers();
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
  async loadUsers1() {
    try {
      this.users1 = await this.ApiService.getUsers().toPromise();
      console.log(this.users1)
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }
}