import { Component, Input, OnInit } from '@angular/core';
import { ShoppingListItem } from '../../models/shoppinglist.interface';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() shoppingListItem: ShoppingListItem | undefined;

  constructor() {}

  ngOnInit(): void {}
}
