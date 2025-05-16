import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id: number;
  login: string;
  email: string;
  phone: string;
  role: string;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  hasDigitalSignature: boolean;
  selected?: boolean;
}

interface ApiResponse {
  page: {
    total: number;
    current: number;
    size: number;
  };
  users: Array<{
    id: number;
    name: string;
    email: string;
    phone: number;
    create_at: number;
    update_at: number;
  }>;
  data: Array<{
    user_id: number;
    is_admin: boolean;
    is_ecp: boolean;
    status: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://test.rikmasters.ru/api/angular-testcase-list/';
  private users : User[] = [];
  constructor(private http: HttpClient) { }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response  => {
        this.users = response.users.map(user => {
          const userData = response.data.find(d => d.user_id === user.id);
          return {
            id: user.id,
            login: user.name,
            email: user.email,
            phone: user.phone.toString(),
            role: userData?.is_admin ? 'admin' : 'user',
            updatedAt: this.formatDate(new Date(user.update_at * 1000)),
            createdAt: this.formatDate(new Date(user.create_at * 1000)),
            isActive: userData?.status === 'ACTIVE',
            hasDigitalSignature: userData?.is_ecp || false
          };
        });
        return this.users;
      })
    );
  }
}