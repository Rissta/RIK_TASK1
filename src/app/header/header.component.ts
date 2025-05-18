import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WindowSizeService } from '../services/window-size.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit{
  isTabletSize : boolean = false;
  noShow : boolean = true;
  isDropdownOpen = false;
  constructor(private WindowSizeService: WindowSizeService) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnInit() : void {
    this.ResizeScreen();
  }

  ResizeScreen(): void {
    this.WindowSizeService.onResize().subscribe(width => 
      {
      this.isTabletSize = width <= 1440;
      this.noShow = width >= 320
    });
  }

}

