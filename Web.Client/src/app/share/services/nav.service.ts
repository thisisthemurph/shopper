import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  private navigationChangeEvent: EventEmitter<boolean> = new EventEmitter();
  private backButtonPathChangeEvent: EventEmitter<string[]> =
    new EventEmitter();

  constructor() {}

  public getNavigationChangeEmitter(): EventEmitter<boolean> {
    return this.navigationChangeEvent;
  }

  public emitToggle(open: boolean): void {
    this.navigationChangeEvent.emit(open);
  }

  public getBackButtonPathEmitter(): EventEmitter<string[]> {
    return this.backButtonPathChangeEvent;
  }

  public emitBackButtonPathChangeEvent(path: string[]) {
    this.backButtonPathChangeEvent.emit(path);
  }
}
