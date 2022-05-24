import { Component, Input } from '@angular/core';
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
