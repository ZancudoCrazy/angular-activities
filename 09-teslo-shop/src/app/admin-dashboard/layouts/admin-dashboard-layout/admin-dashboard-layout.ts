import { Component, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLinkWithHref, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-admin-dashboard-layout',
  imports: [RouterOutlet, RouterLinkActive, RouterLinkWithHref],
  templateUrl: './admin-dashboard-layout.html',
})
export class AdminDashboardLayout {
  private router = inject(Router);
  authService = inject(AuthService);
  user = computed(() => this.authService.user() );

  logout(){
    this.authService.logout()
    this.router.navigateByUrl('/')
  }
}
