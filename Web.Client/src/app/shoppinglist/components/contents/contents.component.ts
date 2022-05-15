import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ShoppingList } from '../../models/shoppinglist.interface';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss'],
})
export class ContentsComponent implements OnInit {
  @Input() shoppingLists: ShoppingList[] = [];
  // public shoppingLists: ShoppingList[] = [];

  // constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    // this.shoppingService
    //   .getShoppingLists()
    //   .subscribe((lists) => (this.shoppingLists = lists));
  }
}
