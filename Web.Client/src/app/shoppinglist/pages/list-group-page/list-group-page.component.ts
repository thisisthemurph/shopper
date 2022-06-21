import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavService } from 'src/app/share/services/nav.service';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-list-group-page',
  templateUrl: './list-group-page.component.html',
  styleUrls: ['./list-group-page.component.scss'],
})
export class ListGroupPageComponent implements OnInit, OnDestroy {
  constructor(
    private navService: NavService,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.navService.emitBackButtonPathChangeEvent(['']);
  }

  ngOnDestroy(): void {
    // This is the terminus page:
    // there is no going back once you have gone back from this page
    this.navService.getBackButtonPathEmitter().emit([]);
  }

  createNewShoppingList(shoppingListName: string): void {
    this.shoppingService.onCreateShoppingList.emit(shoppingListName);
  }
}
