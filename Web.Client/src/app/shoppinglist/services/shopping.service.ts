import { EventEmitter, Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ShoppingList,
  ShoppingListCreateDto,
} from '../models/shoppinglist.interface';
import { ApiService } from 'src/app/api/services/api.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  public onCreate: EventEmitter<string> = new EventEmitter<string>();
  private urlPath = 'ShoppingList';

  constructor(private api: ApiService) {}

  public getShoppingLists(): Observable<ShoppingList[]> {
    return this.api.get<ShoppingList[]>(this.urlPath);
  }

  public add(shoppingList: ShoppingListCreateDto): Observable<ShoppingList> {
    return this.api.post<ShoppingList>(this.urlPath, shoppingList);
  }
}
