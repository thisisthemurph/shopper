import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  private navigationChangeEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  public emitToggle(open: boolean): void {
    this.navigationChangeEvent.emit(open);
  }

  public getNavigationChangeEmitter(): EventEmitter<boolean> {
    return this.navigationChangeEvent;
  }
}
