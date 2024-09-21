import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-submenu-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submenu-navbar.component.html',
  styleUrl: './submenu-navbar.component.scss'
})
export class SubmenuNavbarComponent {
  isSubMenuOpen: boolean = false;


  toggleSettingsMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }


}
