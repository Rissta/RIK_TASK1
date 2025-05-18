import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WindowSizeService } from './../services/window-size.service';

@Component({
  selector: 'app-min-interface',
  imports: [CommonModule],
  templateUrl: './min-interface.component.html',
  styleUrl: './min-interface.component.scss'
})
export class MinInterfaceComponent implements OnInit{
  public isDropdownOpen: boolean = true;
  public show: boolean = true;
  constructor(private WindowSizeService: WindowSizeService){}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnInit() : void {
    this.ResizeScreen();
  }

  ResizeScreen(): void {
    this.WindowSizeService.onResize().subscribe(width => {
      this.show = width <= 320;
    });
  }
}
