import { ShoppingListItemStatusType } from './shoppinglist.enums';

export interface ShoppingListItem {
  id: number;
  listId: number;
  name: string;
  category: null;
  status: ShoppingListItemStatusType;
}

export interface ShoppingList {
  id: number;
  name: string;
  description: string;
  settings: string | null;
  items: ShoppingListItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ShoppingListCreateDto {
  name: string;
  description: string;
}

export interface ShoppingListItemCreateDto {
  name: string;
}
