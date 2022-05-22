import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { ShoppingList } from '../../models/shoppinglist.interface';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss'],
})
export class ListGroupComponent implements OnInit, OnDestroy {
  public shoppingLists: ShoppingList[] = [];
  private onCreate$!: Subscription;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit() {
    this.onCreate$ = this.shoppingService.onCreate.subscribe((listName) =>
      this.createShoppingList(listName)
    );

    this.shoppingService
      .getShoppingLists()
      .pipe(take(1))
      .subscribe((lists) => this.setShoppingListsSorted(lists));
  }

  ngOnDestroy(): void {
    this.onCreate$.unsubscribe();
  }

  private createShoppingList(listName: string) {
    console.log({ listName });
    this.shoppingService
      .add({
        name: listName,
        description: '',
      })
      .pipe(take(1))
      .subscribe((shoppingList) => {
        this.setShoppingListsSorted([...this.shoppingLists, shoppingList]);
      });
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
