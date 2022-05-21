import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import {
  ShoppingList,
  ShoppingListCreateDto,
} from 'src/app/shoppinglist/models/shoppinglist.interface';
import { ShoppingService } from 'src/app/shoppinglist/services/shopping.service';

@Component({
  selector: 'app-list-collection-page',
  templateUrl: './list-collection-page.component.html',
  styleUrls: ['./list-collection-page.component.scss'],
})
export class ListCollectionPageComponent {}
