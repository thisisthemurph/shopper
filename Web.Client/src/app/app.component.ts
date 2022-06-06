import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavService } from './share/services/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public navIsOpen: boolean = false;
  public navOpenSubscription: Subscription | undefined;

  constructor(private navService: NavService) {}

  ngOnInit(): void {
    this.navOpenSubscription = this.navService
      .getNavigationChangeEmitter()
      .subscribe((value) => {
        this.navIsOpen = value;
        console.log({ app: value });
      });
  }

  ngOnDestroy(): void {
    this.navOpenSubscription?.unsubscribe();
  }
}
