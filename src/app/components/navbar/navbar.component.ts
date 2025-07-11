import { Component } from '@angular/core';
import { ThemeServiceService } from '../../services/theme/theme-service.service';
import { Router,RouterLink,RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private themeService: ThemeServiceService){}

  toggleTheme(){
    this.themeService.toggleTheme();
  }

  get isDark(){
    return this.themeService.isDarkMode()
  }

}
