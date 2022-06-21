import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OptionsMenuService {
  public optionsMenuEvent: EventEmitter<number | null> = new EventEmitter();

  constructor() {}

  public closeAll(): void {
    this.optionsMenuEvent.emit(null);
  }

  public open(key: number): void {
    this.optionsMenuEvent.emit(key);
  }
}
