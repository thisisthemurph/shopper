import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShoppingList } from '../models/shoppinglist.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private baseUrl = 'https://localhost:7009/api/ShoppingList';

  constructor(private http: HttpClient) {}

  public getShoppingLists(): Observable<ShoppingList[]> {
    return this.http.get<ShoppingList[]>(this.baseUrl);
  }
}
