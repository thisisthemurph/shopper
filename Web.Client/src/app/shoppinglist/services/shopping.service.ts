import { EventEmitter, Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ShoppingList,
  ShoppingListCreateDto,
  ShoppingListItem,
  ShoppingListItemCreateDto,
} from '../models/shoppinglist.interface';
import { ApiService } from 'src/app/api/services/api.service';
import { ShoppingListItemStatusType } from '../models/shoppinglist.enums';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private urlPath = 'ShoppingList';

  public onCreateShoppingList: EventEmitter<string> =
    new EventEmitter<string>();
  public onCreateShoppingListItem: EventEmitter<string> =
    new EventEmitter<string>();

  constructor(private api: ApiService) {}

  public getList(listId: number): Observable<ShoppingList> {
    const url = `${this.urlPath}/${listId}`;
    return this.api.get<ShoppingList>(url);
  }

  public getShoppingLists(): Observable<ShoppingList[]> {
    return this.api.get<ShoppingList[]>(this.urlPath);
  }

  public add(shoppingList: ShoppingListCreateDto): Observable<ShoppingList> {
    return this.api.post<ShoppingList>(this.urlPath, shoppingList);
  }

  public addNewItem(
    shoppingListId: number,
    shoppingListItem: ShoppingListItemCreateDto
  ): Observable<ShoppingListItem> {
    const url = `${this.urlPath}/${shoppingListId}/item`;
    return this.api.post<ShoppingListItem>(url, shoppingListItem);
  }

  public updateItemStatus(
    shoppingListId: number,
    itemId: number,
    status: ShoppingListItemStatusType
  ): Observable<ShoppingListItem> {
    const url = `${this.urlPath}/${shoppingListId}/Item/${itemId}/status`;
    return this.api.put<ShoppingListItem>(url, status);
  }
}
