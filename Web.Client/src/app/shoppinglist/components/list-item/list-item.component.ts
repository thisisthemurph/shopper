import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs';
import {
  OptionsMenuItem,
  OptionsMenuVariant,
} from 'src/app/share/components/options-menu/options-menu.component';
import { ShoppingListItem } from '../../models/shoppinglist.interface';
import { ShoppingListItemStatusType } from '../../models/shoppinglist.enums';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() shoppingListItem!: ShoppingListItem;
  @Output() removeItemEvent = new EventEmitter<ShoppingListItem>();

  public optionMenuItems: OptionsMenuItem[] = [
    {
      text: 'Delete',
      variant: OptionsMenuVariant.Error,
      onClick: this.onDelete.bind(this),
    },
    { text: 'Set status', onClick: () => console.log('Setting...') },
    { text: 'More', onClick: () => console.log('Mooring...') },
  ];

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {}

  public get listId(): number {
    return this.shoppingListItem.listId;
  }

  public get itemId(): number {
    return this.shoppingListItem.id;
  }

  public get name(): string {
    return this.shoppingListItem.name;
  }

  public get status(): ShoppingListItemStatusType {
    return this.shoppingListItem.status;
  }

  public get isChecked(): boolean {
    return this.shoppingListItem.status === ShoppingListItemStatusType.Checked;
  }

  public onChangeStatus(): void {
    const newStatus =
      this.shoppingListItem?.status === ShoppingListItemStatusType.Checked
        ? ShoppingListItemStatusType.Unchecked
        : ShoppingListItemStatusType.Checked;

    this.shoppingService
      .updateItemStatus(this.listId, this.itemId, newStatus)
      .pipe(take(1))
      .subscribe((item) => {
        this.shoppingListItem.status = item.status;
      });
  }

  private onDelete(): void {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    this.shoppingService
      .deleteItem(this.listId, this.itemId)
      .pipe(take(1))
      .subscribe((deletedItem) => {
        this.removeItemEvent.emit(deletedItem);
      });
  }
}
