import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WindowSizeService } from './../services/window-size.service';


@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{
  public isDropdownOpen: boolean = true;
  public isTabletSize: boolean = true;
  constructor(private WindowSizeService: WindowSizeService){}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnInit() : void {
    this.ResizeScreen();
  }

  ResizeScreen(): void {
    this.WindowSizeService.onResize().subscribe(width => {
      this.isTabletSize = width >= 1440;
    });
  }
}
