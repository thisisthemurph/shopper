import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

enum NavigationTypeEnum {
  Unauthenticated = 'Unauthenticated',
  Authenticated = 'Authenticated',
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public NavigationType = NavigationTypeEnum;
  public navigationType: NavigationTypeEnum =
    NavigationTypeEnum.Unauthenticated;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.navigationType = this.authService.isAuthenticated()
      ? NavigationTypeEnum.Authenticated
      : NavigationTypeEnum.Unauthenticated;
  }
}
