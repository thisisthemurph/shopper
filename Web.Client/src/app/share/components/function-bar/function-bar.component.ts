import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from '@angular/router';
import { take } from 'rxjs';
import { ShoppingList } from 'src/app/shoppinglist/models/shoppinglist.interface';
import { ShoppingService } from 'src/app/shoppinglist/services/shopping.service';

@Component({
  selector: 'app-function-bar',
  templateUrl: './function-bar.component.html',
  styleUrls: ['./function-bar.component.scss'],
})
export class FunctionBarComponent {
  @Input() placeholder: string = '';
  public value: string = '';

  constructor(private shoppingService: ShoppingService) {}

  onAction(): void {
    this.shoppingService.onCreate.emit(this.value);
  }
}
