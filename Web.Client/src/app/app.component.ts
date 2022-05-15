import { Component, OnInit } from '@angular/core';
import { ShoppingList } from './shoppinglist/models/shoppinglist.interface';
import { ShoppingService } from './shoppinglist/services/shopping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public shoppingLists: ShoppingList[] = [];

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.shoppingService
      .getShoppingLists()
      .subscribe((lists) => this.setShoppingListsSorted(lists));
  }

  onNewList($event: ShoppingList) {
    console.log('Finally we have the shopping list');
    console.log($event);

    this.setShoppingListsSorted([...this.shoppingLists, $event]);
  }

  private setShoppingListsSorted(lists: ShoppingList[]): void {
    this.shoppingLists = lists.sort((a, b) => {
      const aCreated = new Date(a.createdAt);
      const bCreated = new Date(b.createdAt);

      if (aCreated > bCreated) return -1;
      if (aCreated < bCreated) return 1;
      return 0;
    });
  }
}
