import { Component } from '@angular/core';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  isSidenavCollapsed = false;
  screenWidth = 0;

  onToggleSidenav(data: SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSidenavCollapsed = data.collapsed;
  }
}
