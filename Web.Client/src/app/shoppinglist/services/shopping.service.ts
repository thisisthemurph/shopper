import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ShoppingList,
  ShoppingListCreateDto,
} from '../models/shoppinglist.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private baseUrl = 'https://localhost:7009/api/ShoppingList';

  constructor(private http: HttpClient) {}

  public getShoppingLists(): Observable<ShoppingList[]> {
    return this.http.get<ShoppingList[]>(this.baseUrl);
  }

  public add(shoppingList: ShoppingListCreateDto): Observable<ShoppingList> {
    return this.http.post<ShoppingList>(
      this.baseUrl,
      shoppingList,
      httpOptions
    );
  }
}
