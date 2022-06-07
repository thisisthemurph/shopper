import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavService } from 'src/app/share/services/nav.service';

@Component({
  selector: 'app-list-group-page',
  templateUrl: './list-group-page.component.html',
  styleUrls: ['./list-group-page.component.scss'],
})
export class ListGroupPageComponent implements OnInit, OnDestroy {
  constructor(private navService: NavService) {}

  ngOnInit(): void {
    this.navService.emitBackButtonPathChangeEvent(['']);
  }

  ngOnDestroy(): void {
    // This is the terminus page:
    // there is no going back once you have gone back from this page
    this.navService.getBackButtonPathEmitter().emit([]);
  }
}
