import { Injectable } from '@angular/core';

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

@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  private mockUsers: User[] = [
    {
      id: 1,
      login: 'ivanov',
      email: 'ivanov@example.com',
      phone: '+7 (123) 456-78-90',
      role: 'Администратор',
      updatedAt: '15.05.2023',
      createdAt: '10.01.2023',
      isActive: true,
      hasDigitalSignature: true
    },
    {
      id: 2,
      login: 'petrov',
      email: 'petrov@example.com',
      phone: '+7 (234) 567-89-01',
      role: 'Пользователь',
      updatedAt: '16.05.2023',
      createdAt: '15.02.2023',
      isActive: true,
      hasDigitalSignature: false
    },
    {
      id: 3,
      login: 'sidorova',
      email: 'sidorova@example.com',
      phone: '+7 (345) 678-90-12',
      role: 'Пользователь',
      updatedAt: '17.05.2023',
      createdAt: '20.03.2023',
      isActive: false,
      hasDigitalSignature: true
    },
    {
      id: 4,
      login: 'smirnov',
      email: 'smirnov@example.com',
      phone: '+7 (456) 789-01-23',
      role: 'Администратор',
      updatedAt: '18.05.2023',
      createdAt: '05.04.2023',
      isActive: true,
      hasDigitalSignature: false
    },
    {
      id: 5,
      login: 'kuznetsov',
      email: 'kuznetsov@example.com',
      phone: '+7 (567) 890-12-34',
      role: 'Пользователь',
      updatedAt: '19.05.2023',
      createdAt: '01.05.2023',
      isActive: true,
      hasDigitalSignature: true
    },
    {
      id: 6,
      login: 'popova',
      email: 'popova@example.com',
      phone: '+7 (678) 901-23-45',
      role: 'Пользователь',
      updatedAt: '20.05.2023',
      createdAt: '05.05.2023',
      isActive: false,
      hasDigitalSignature: false
    },
    {
      id: 7,
      login: 'volkov',
      email: 'volkov@example.com',
      phone: '+7 (789) 012-34-56',
      role: 'Администратор',
      updatedAt: '21.05.2023',
      createdAt: '10.05.2023',
      isActive: true,
      hasDigitalSignature: true
    },
    {
      id: 8,
      login: 'fedorova',
      email: 'fedorova@example.com',
      phone: '+7 (890) 123-45-67',
      role: 'Пользователь',
      updatedAt: '22.05.2023',
      createdAt: '15.05.2023',
      isActive: true,
      hasDigitalSignature: false
    },
    {
      id: 9,
      login: 'egorov',
      email: 'egorov@example.com',
      phone: '+7 (901) 234-56-78',
      role: 'Пользователь',
      updatedAt: '23.05.2023',
      createdAt: '20.05.2023',
      isActive: false,
      hasDigitalSignature: true
    },
    {
      id: 10,
      login: 'nikolaeva',
      email: 'nikolaeva@example.com',
      phone: '+7 (912) 345-67-89',
      role: 'Администратор',
      updatedAt: '24.05.2023',
      createdAt: '22.05.2023',
      isActive: true,
      hasDigitalSignature: false
    },
    {
      id: 11,
      login: 'orlov',
      email: 'orlov@example.com',
      phone: '+7 (923) 456-78-90',
      role: 'Пользователь',
      updatedAt: '25.05.2023',
      createdAt: '23.05.2023',
      isActive: true,
      hasDigitalSignature: true
    },
    {
      id: 12,
      login: 'pavlova',
      email: 'pavlova@example.com',
      phone: '+7 (934) 567-89-01',
      role: 'Пользователь',
      updatedAt: '26.05.2023',
      createdAt: '24.05.2023',
      isActive: false,
      hasDigitalSignature: false
    },
    {
      id: 13,
      login: 'gusev',
      email: 'gusev@example.com',
      phone: '+7 (945) 678-90-12',
      role: 'Администратор',
      updatedAt: '27.05.2023',
      createdAt: '25.05.2023',
      isActive: true,
      hasDigitalSignature: true
    },
    {
      id: 14,
      login: 'komarova',
      email: 'komarova@example.com',
      phone: '+7 (956) 789-01-23',
      role: 'Пользователь',
      updatedAt: '28.05.2023',
      createdAt: '26.05.2023',
      isActive: true,
      hasDigitalSignature: false
    },
    {
      id: 15,
      login: 'lebedeva',
      email: 'lebedeva@example.com',
      phone: '+7 (967) 890-12-34',
      role: 'Пользователь',
      updatedAt: '29.05.2023',
      createdAt: '27.05.2023',
      isActive: false,
      hasDigitalSignature: true
    },
    {
      id: 16,
      login: 'sokolov',
      email: 'sokolov@example.com',
      phone: '+7 (978) 901-23-45',
      role: 'Администратор',
      updatedAt: '30.05.2023',
      createdAt: '28.05.2023',
      isActive: true,
      hasDigitalSignature: false
    },
    {
      id: 17,
      login: 'voronova',
      email: 'voronova@example.com',
      phone: '+7 (989) 012-34-56',
      role: 'Пользователь',
      updatedAt: '31.05.2023',
      createdAt: '29.05.2023',
      isActive: true,
      hasDigitalSignature: true
    },
    {
      id: 18,
      login: 'morozov',
      email: 'morozov@example.com',
      phone: '+7 (990) 123-45-67',
      role: 'Пользователь',
      updatedAt: '01.06.2023',
      createdAt: '30.05.2023',
      isActive: false,
      hasDigitalSignature: false
    },
    {
      id: 19,
      login: 'kovaleva',
      email: 'kovaleva@example.com',
      phone: '+7 (991) 234-56-78',
      role: 'Администратор',
      updatedAt: '02.06.2023',
      createdAt: '31.05.2023',
      isActive: true,
      hasDigitalSignature: true
    },
    {
      id: 20,
      login: 'zaitseva',
      email: 'zaitseva@example.com',
      phone: '+7 (992) 345-67-89',
      role: 'Пользователь',
      updatedAt: '03.06.2023',
      createdAt: '01.06.2023',
      isActive: true,
      hasDigitalSignature: false
    }
  ];

  constructor() {}

  getUsers(): User[] {
    return this.mockUsers;
  }

  toggleUserStatus(userId: number, userState: boolean): void {
    const user = this.mockUsers.find(u => u.id === userId);
    if (user) {
      user.isActive = userState;
      user.updatedAt = this.formatDate(new Date());
    }
  }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
}