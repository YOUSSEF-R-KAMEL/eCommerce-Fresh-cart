import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent {
  isNavbarOpen = false;
  private readonly _authService = inject(AuthService)

  ngOnInit() {
    const navbar = document.getElementById('navbarNav');
    if (navbar) {
      navbar.addEventListener('show.bs.collapse', () => {
        this.isNavbarOpen = true;
      });
      navbar.addEventListener('hidden.bs.collapse', () => {
        this.isNavbarOpen = false;
      });
    }
  }

  closeNavbar() {
    const navbar = document.getElementById('navbarNav');
    if (navbar?.classList.contains('show')) {
      this.isNavbarOpen = false;
      navbar.classList.remove('show');
    }
  }

  signOut() {
    this._authService.deleteInfo()
    this.closeNavbar();
  }
}
