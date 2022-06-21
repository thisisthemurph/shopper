import { Component, Input } from '@angular/core';
import { ShoppingService } from 'src/app/shoppinglist/services/shopping.service';

@Component({
  selector: 'app-function-bar',
  templateUrl: './function-bar.component.html',
  styleUrls: ['./function-bar.component.scss'],
})
export class FunctionBarComponent {
  @Input() placeholder: string = '';
  @Input() actionCallback: ((value: string) => void) | undefined;

  public value: string = '';

  constructor() {}

  onAction(): void {
    if (this.actionCallback === undefined) {
      return;
    }

    this.actionCallback(this.value);
  }
}
