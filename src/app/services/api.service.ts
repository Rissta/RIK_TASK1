import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface UserData {
  id: number;
  login: string;
  email: string;
  phone: string;
  role: boolean;
  updatedAt: Date;
  createdAt: Date;
  isActive: string;
  hasDigitalSignature: boolean;
  selected?: boolean;
}

export interface Page {
  total: number;
  current: number;
  size: number;
};

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
  
  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserData[]> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response => {

        const usersMap = new Map<number, ApiResponse['users'][0]>();
        response.users.forEach(user => {
          usersMap.set(user.id, user);
        });

        return response.data.map(dataItem => {
          const user = usersMap.get(dataItem.user_id);
          if (!user) {
            return {
              id: dataItem.user_id,
              login: `unknown_${dataItem.user_id}`,
              email: '',
              phone: '',
              role: dataItem.is_admin,
              updatedAt: new Date(),
              createdAt: new Date(),
              isActive: dataItem.status,
              hasDigitalSignature: dataItem.is_ecp
            };
          }

          return {
            id: user.id,
            login: user.name,
            email: user.email,
            phone: user.phone.toString(),
            role: dataItem.is_admin,
            updatedAt: new Date(user.update_at * 1000),
            createdAt: new Date(user.create_at * 1000),
            isActive: dataItem.status,
            hasDigitalSignature: dataItem.is_ecp
          };
        });
      })
    );
  }
  getPage() : Observable<Page> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response => {
        return {
          total: response.page.total,
          current: response.page.current,
          size: response.page.size
        }
      })
    )
  }
}