import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavService } from 'src/app/share/services/nav.service';
import { ShoppingList } from '../../models/shoppinglist.interface';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit, OnDestroy {
  public shoppingList: ShoppingList | null = null;

  private shoppingListSubscription$: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private navService: NavService,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = Number(params.get('listId'));

      this.shoppingListSubscription$ = this.shoppingService
        .getList(id)
        .subscribe((list) => {
          this.shoppingList = list;
        });
    });

    this.navService.getBackButtonPathEmitter().emit(['/', 'list']);
  }

  ngOnDestroy(): void {
    this.navService.getBackButtonPathEmitter().emit([]);
    this.shoppingListSubscription$?.unsubscribe();
  }

  public createShoppingListItem = (shoppingListItemName: string) => {
    this.shoppingService.onCreateShoppingListItem.emit(shoppingListItemName);
  };
}
