import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShoppingList } from 'src/app/shoppinglist/models/shoppinglist.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() newListEvent = new EventEmitter<ShoppingList>();
  constructor() {}

  ngOnInit(): void {}

  onNewList($event: ShoppingList) {
    this.newListEvent.emit($event);
  }
}
