import { Component, Input, OnInit } from '@angular/core';
import {
  OptionsMenuItem,
  OptionsMenuVariant,
} from 'src/app/share/components/options-menu/options-menu.component';
import { ShoppingListItem } from '../../models/shoppinglist.interface';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() shoppingListItem: ShoppingListItem | undefined;

  public optionMenuItems: OptionsMenuItem[] = [
    {
      text: 'Delete',
      variant: OptionsMenuVariant.Error,
      onClick: () => console.log('Deleting...'),
    },
    { text: 'Set status', onClick: () => console.log('Setting...') },
    { text: 'More', onClick: () => console.log('Mooring...') },
  ];

  constructor() {}

  ngOnInit(): void {}
}
