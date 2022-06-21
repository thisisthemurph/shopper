import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NavService } from '../../services/nav.service';

enum NavigationTypeEnum {
  Unauthenticated = 'Unauthenticated',
  Authenticated = 'Authenticated',
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  @Input()
  public heading: string = '';

  public NavigationType = NavigationTypeEnum;
  public navigationType: NavigationTypeEnum =
    NavigationTypeEnum.Unauthenticated;

  public backButtonPath: string[] = [];
  public backButtonPathChangedSubscription$: Subscription | undefined;
  public menuIsOpen: boolean = false;
  public navOpenSubscription$: Subscription | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private navService: NavService
  ) {}

  ngOnInit(): void {
    this.navigationType = this.authService.isAuthenticated()
      ? NavigationTypeEnum.Authenticated
      : NavigationTypeEnum.Unauthenticated;

    this.navOpenSubscription$ = this.navService
      .getNavigationChangeEmitter()
      .subscribe((value) => {
        this.menuIsOpen = value;
      });

    this.backButtonPathChangedSubscription$ = this.navService
      .getBackButtonPathEmitter()
      .subscribe((path) => {
        this.backButtonPath = path;
      });
  }

  ngOnDestroy(): void {
    this.navOpenSubscription$?.unsubscribe();
    this.backButtonPathChangedSubscription$?.unsubscribe();
  }

  public get hasHeading(): boolean {
    return this.heading.length > 0;
  }

  public toggleMenu(): void {
    this.navService.emitToggle(!this.menuIsOpen);
  }

  public backButtonHasPath(): boolean {
    return this.backButtonPath.length > 0;
  }

  public onBackButtonClick(): void {
    this.router.navigate(this.backButtonPath);
  }
}
