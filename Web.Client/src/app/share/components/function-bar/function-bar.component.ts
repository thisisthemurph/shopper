import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Event } from '@angular/router';
import { take } from 'rxjs';
import { ShoppingList } from 'src/app/shoppinglist/models/shoppinglist.interface';
import { ShoppingService } from 'src/app/shoppinglist/services/shopping.service';

@Component({
  selector: 'app-function-bar',
  templateUrl: './function-bar.component.html',
  styleUrls: ['./function-bar.component.scss'],
})
export class FunctionBarComponent implements OnInit {
  @Output() newListEvent = new EventEmitter<ShoppingList>();
  public value: string = '';

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {}

  onEnterKeyUp($event: any): void {
    console.log({ $event });
  }

  onNewShoppingList(): void {
    console.log('Emitting');
    this.shoppingService
      .add({
        name: this.value,
        description: '',
      })
      .pipe(take(1))
      .subscribe((newList) => {
        this.newListEvent.emit(newList);
      });
  }
}
