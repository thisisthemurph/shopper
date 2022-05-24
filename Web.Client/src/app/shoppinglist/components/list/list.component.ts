import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingList } from '../../models/shoppinglist.interface';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() shoppingList: ShoppingList | null = null;

  get isLoading(): boolean {
    return this.shoppingList === null;
  }
}
