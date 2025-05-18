import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UserManagementComponent } from '../user-management/user-management.component';
import { MinInterfaceComponent } from '../min-interface/min-interface.component';
@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [
    HeaderComponent,
    SidebarComponent,
    UserManagementComponent,
    MinInterfaceComponent
]
})
export class LayoutComponent {}
