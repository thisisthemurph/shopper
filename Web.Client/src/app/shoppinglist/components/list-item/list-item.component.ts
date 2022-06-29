import { Component, Input, OnInit } from '@angular/core';
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

  public optionMenuItems: OptionsMenuItem[] = [
    {
      text: 'Delete',
      variant: OptionsMenuVariant.Error,
      onClick: () => console.log('Deleting...'),
    },
    { text: 'Set status', onClick: () => console.log('Setting...') },
    { text: 'More', onClick: () => console.log('Mooring...') },
  ];

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {}

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
    console.log('onChangeStatus()');

    // if (!this.shoppingListItem.listId || !this.shoppingListItem.id) {
    //   return;
    // }

    const newStatus =
      this.shoppingListItem?.status === ShoppingListItemStatusType.Checked
        ? ShoppingListItemStatusType.Unchecked
        : ShoppingListItemStatusType.Checked;

    console.log({ currentStatus: this.shoppingListItem.status });
    console.log({ newStatus });

    this.shoppingService
      .updateItemStatus(
        this.shoppingListItem?.listId,
        this.shoppingListItem?.id,
        newStatus
      )
      .pipe(take(1))
      .subscribe((item) => {
        console.log({ item });

        // if (this.shoppingListItem === undefined) {
        //   return;
        // }

        this.shoppingListItem.status = item.status;
      });
  }
}
