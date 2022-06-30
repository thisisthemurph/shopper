import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import {
  ShoppingList,
  ShoppingListItem,
} from '../../models/shoppinglist.interface';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() shoppingList: ShoppingList | null = null;

  onCreate$!: Subscription;

  get isLoading(): boolean {
    return this.shoppingList === null;
  }

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.onCreate$ = this.shoppingService.onCreateShoppingListItem.subscribe(
      (itemName) => this.createShoppingListItem(itemName)
    );
  }

  ngOnDestroy(): void {
    this.onCreate$.unsubscribe();
  }

  private createShoppingListItem(name: string): void {
    if (!this.shoppingList) {
      return;
    }

    this.shoppingService
      .addNewItem(this.shoppingList.id, {
        name,
      })
      .pipe(take(1))
      .subscribe((shoppingListItem) => {
        this.shoppingList?.items.push(shoppingListItem);
      });
  }

  public removeItem(listItem: ShoppingListItem) {
    if (!this.shoppingList) return;

    this.shoppingList.items = this.shoppingList.items.filter(
      (item) => item.id !== listItem.id
    );
  }
}
