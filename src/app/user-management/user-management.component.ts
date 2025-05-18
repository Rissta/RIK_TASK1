import { WindowSizeService } from './../services/window-size.service';
import { ApiService, UserData, Page } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { LineTableComponent } from '../line-table/line-table.component';
import { CommonModule } from '@angular/common';
import { CardTableComponent } from '../card-table/card-table.component';
@Component({
  selector: 'app-user-management',
  imports: [FilterComponent, LineTableComponent, CardTableComponent, CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent implements OnInit {
  public users: UserData[] = [];
  public filterUsers: UserData[] = [];
  public page: Page | undefined = { total: 0, current: 0, size: 0 };
  public selectedUsers: UserData[] = [];
  public showFiltr: boolean = false;
  public useFilter: boolean = false;
  public isLoading: boolean = false;
  public changeTable: boolean = false;
  public errorMessage: string | null = null;
  public inputWidth: string = "266px";
  public inputHigth: string = "44px";
  public isMobile: boolean = false;
  private readonly STORAGE_KEY = 'user_management_state';
  public noShow: boolean = false;

  constructor(private WindowSizeService: WindowSizeService, private ApiService: ApiService) {}

  ngOnInit(): void {
    this.ResizeScreen();
    this.loadUsers();
    this.loadPage();
    this.loadStateFromLocalStorage();
  }

  private saveStateToLocalStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.users));
  }

  private loadStateFromLocalStorage(): void {
    const savedState = localStorage.getItem(this.STORAGE_KEY);
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        this.users = this.users.map(user => {
          const savedUser = parsedState.find((u: UserData) => u.id === user.id);
          return savedUser ? { ...user, isActive: savedUser.isActive } : user;
        });
      } catch (e) {
        console.error('Не удалось загрузить сохраненное состояние', e);
      }
    }
  }

  blockUsers(): void {
    if (this.selectedUsers.length === 0) return;
    
    this.selectedUsers.forEach(user => {
      user.isActive = "INACTIVE";
    });
    
    this.users = this.users.map(user => {
      const selectedUser = this.selectedUsers.find(u => u.id === user.id);
      return selectedUser ? { ...user, isActive: "INACTIVE" } : user;
    });
    
    this.saveStateToLocalStorage();
  }

  unblockUsers(): void {
    if (this.selectedUsers.length === 0) return;
    
    this.selectedUsers.forEach(user => {
      user.isActive = "ACTIVE";
    });
    
    this.users = this.users.map(user => {
      const selectedUser = this.selectedUsers.find(u => u.id === user.id);
      return selectedUser ? { ...user, isActive: "ACTIVE" } : user;
    });
    
    this.saveStateToLocalStorage();
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
      this.changeTable = width < 1024;
      this.isMobile = width < 786
      this.noShow = width < 320;
    });
  }

  onFilteredUsers(users: UserData[]) {
    this.users = users;
  }

  onSelectedUsers(users: UserData[]) {
    this.selectedUsers = users;
    console.log(this.selectedUsers)
  }
  
  async loadPage() {
    try {
      const page = await this.ApiService.getPage().toPromise();
      this.page = page || undefined;
      console.log(this.page);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }

  async loadUsers() {
    try {
      const users = await this.ApiService.getUsers().toPromise();
      this.users = users || [];
      this.filterUsers = users || [];
      // После загрузки пользователей загружаем сохраненное состояние
      this.loadStateFromLocalStorage();
      console.log(this.users);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }
}